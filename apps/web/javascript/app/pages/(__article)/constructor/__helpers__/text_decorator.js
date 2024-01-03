export class TextDecorator {
    constructor(_text) {
        this.text = _text;
    }

    bold() {
        this.text = this.text.replace(/【/g, '<b>').replace(/】/g, '</b>');
    }

    italic() {
        this.text = this.text.replace(/⟨/g, '<i>').replace(/⟩/g, '</i>');
    }

    reference_links() {
        this.text = this.text
            .replace(/｢/g, '[<a class="reference">')
            .replace(/｣/g, '</a>]');
    }

    all() {
        this.bold();
        this.italic();
        this.reference_links();
    }

    get_text() {
        return this.text;
    }
}
