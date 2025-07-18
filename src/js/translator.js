class Translator {
  constructor(options = {}) {
    this._options = Object.assign({}, this.defaultConfig, options);
    this._lang = this.getLanguage();
    this._elements = document.querySelectorAll("[data-i18n]");
  }

  getLanguage() {
    if (!this._options.detectLanguage) {
      return this._options.defaultLanguage;
    }

    var stored = localStorage.getItem("language");

    if (this._options.persist && stored) {
      return stored;
    }

    var lang = navigator.languages
      ? navigator.languages[0]
      : navigator.language;

    return lang.substring(0, 2);
  }

  load(lang = null) {
    if (lang) {
      if (!this._options.languages.includes(lang)) {
        return;
      }

      this._lang = lang;
    }

    var path = `${this._options.filesLocation}/${this._lang}.json`;

    fetch(path)
      .then(res => res.json())
      .then(translation => {
        this.translate(translation);
        this.toggleLangTag();

        if (this._options.persist) {
          localStorage.setItem("language", this._lang);
        }
      })
      .catch(err => {
        console.error(
          `Could not load ${path}.json. Please make sure that the path is correct.`,
          err
        );
      });
  }

  toggleLangTag() {
    if (document.documentElement.lang !== this._lang) {
      document.documentElement.lang = this._lang;
    }
  }

  translate(translation) {
    function replace(element) {
      var text = element.dataset.i18n
        .split(".")
        .reduce((obj, i) => obj[i], translation);

      if (text) {
        element.innerHTML = text;
      }
    }

    this._elements.forEach(replace);
  }

  get defaultConfig() {
    return {
      persist: true,
      languages: ["en"],
      defaultLanguage: "en",
      filesLocation: "/i18n"
    };
  }
}

var translator = new Translator({
  persist: true,
  languages: ["en", "vi"],
  defaultLanguage: "en",
  detectLanguage: true,
  filesLocation: "/i18n"
});

translator.load();

document.querySelector("form").addEventListener("click", function(evt) {
  if (evt.target.tagName === "INPUT") {
    translator.load(evt.target.value);
    localStorage.setItem("language", evt.target.value);
  }
});
