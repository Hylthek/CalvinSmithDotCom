import { TextSelector } from "./TextSelector.js";

async function GetJson() {
    const requestURL = "rsvp_reading/json/text.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    return await response.json();
}

// Get JSON.
const text_json = await GetJson()
const lorem_ipsum = text_json.loremIpsum;
const twilight_preface = text_json.preface;

// Canvas boilerplate.
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
// Resolution.
canvas.width = 500
canvas.height = canvas.width * 9 / 16
// Scalar aliases
const kS = canvas.width // Width of canvas in pixels for relative sizing. S = scale.
const kW = canvas.width // Width of canvas as an alias.
const kH = canvas.height // Height of canvas as an alias.

// Parse text.
const word_array = StrToWordArray(twilight_preface)
// Create text getting class.
const text_selector = new TextSelector(word_array)

function main() {
    window.requestAnimationFrame(main)

    text_selector.UpdateIndexTask(performance.now())

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const text_height = kS * 0.05
    ctx.font = text_height + "px monospace"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "black"
    const letter_width = ctx.measureText(" ").width
    const curr_word = text_selector.word_array[text_selector.curr_index]
    const ORP_index = text_selector.FindOptimalRecognitionPoint(curr_word)
    ctx.fillText(
        curr_word,
        kW / 2 - letter_width * ORP_index,
        kH / 2
    )
    ctx.fillRect(kW / 2, kH / 2 - text_height / 2, letter_width, text_height)
    ctx.fillStyle = "red"
    ctx.fillText(curr_word.charAt(ORP_index), kW / 2, kH / 2)
}
main()

// Function takes in a string and returns an array of words.
function StrToWordArray(str) {
    const array = str.split(" ")
    return array
}