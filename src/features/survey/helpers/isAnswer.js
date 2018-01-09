export default function isAnswer(value) {
    return Array.isArray(value) ? (value.length !== 0) : value;
}