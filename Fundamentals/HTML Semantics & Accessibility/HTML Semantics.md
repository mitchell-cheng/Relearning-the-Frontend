# Semantic HTML

In the context of computer science, **semantics refers to the meaning of programming languages**.

In the context of frontend development, semantics can be seen in HTML, CSS, and JavaScript.

In terms of HTML, the tags themselves have semantic meaning, for example:

- `<ul>` for unordered list
- `<ol>` for ordered list
- `<table>` for table or tabular
  etc...

## Semantic Elements

HTML5 introduced semantic elements:

### `<article>`

A self-contained composition in a doc, page, app, or site, which is intended to be independently distributable or reusable.

#### Example

A blog post, a magazine, an article, a product card, a user-submitted comment, a widget, or a gadget.

#### Usage

- **typically including a heading**: `<h1> - <h6>` as the child
- when multiple **`<article>` nested**, the inner one should be **related to** the outer one.
- put author info of `<article>` in `<address>`
- publication data and time of an `<article>` can be using `<time>`'s `datetime` attribute.

---

### `<aside>`

A portion of a document whose content is indirectly related to the main content.

#### Example

A sidebar or call-out box.

#### Usage

Do not use it to tag parenthesized text.

---

### `<details>`, `<summary>`

`<details>` creates a disclosure widget in which the info is visible only when the widget is toggled into an open state.

Use `<summary>` or label for `<summary>`. The default state is closed and only shows the summary.

#### Example

LLM's thinking widget.

#### Usage

- `<summary>` may only be used as the first child of a `<details>` element.

#### Attribute

- `open`: Boolean value to indicate the content visibility.
- `name`: group multiple `<details>` with the same `name`, but only one can be visible.

#### Event

- `toggle`: detect when the widget changes state

---

### `<figure>`, ` <figcaption>`

`<figure> ` for self-contained content, potentially with a caption `<figcaption>`.

#### Example

Images, illustrations, diagrams, code snippets.

---

### `<header>`, `<footer>`

`<footer>` represents a footer for its nearest ancestor **section content** or **sectioning root** element. `<header>` represents introductory content.

#### Example

- `<footer>` for author info, related link, or copyright.
- `<header>` may contain heading elements, a search form, an author name, a logo, etc.

#### Usage

- `<footer>` can be the footer of the whole page when its sectioning root is `<body>`
- If `<address>` is used for author info, it could be placed in `<footer>`
- When `<header>`'s context is `<body>`, it has an identical meaning to the site-wide banner. It's a `banner` in the accessibility tree. Or it's a `section` in the accessibility tree, which contains headings.

---

### `<form>`

`<form>` provides interactive controls for submitting information.

#### Attributes

- `autocomplete`: whether input elements can, by default, have the values automatically completed by the browser.
- `name`: name of the form, it must be **unique** among the forms and **not the empty string**

For submission:

- `action`: the URL that processes the info.
- `method`: the HTTP method to submit the form with, allowed methods: `post`, `get`, `dialog`.
- `target`: indicates where to display the response after submitting the form, example: `_self`(default), `_blank`(new browsing context), `_parent`(parent context)
- `novalidate`: boolean indicates that the form shouldn't be validated.

---

### `<main>`

The dominant content of the `<body>` of a document. The content within `<main>` should be directly related to the central topic of a document.

A document can't have one more `<main>` without a `hidden` attribute.

#### Usage

- `<main>` doesn't contribute to the document's outline, it doesn't affect the DOM's concept of the structure of the page.
- The content within `<main>` should be unique, and the repeated content should be placed outside of `<main>`

---

### `<mark>`

Represents text which is **marked** or **highlighted** for reference or notation purposes due to the marked passage's relevance in the enclosing context.

#### Usage

- Used in `<q>` or `<blockquote>`
- Otherwise, it indicates a portion of the document's content is relevant to the user's current activity.
- Don't use it for syntax highlight, use `<span>` with CSS instead; don't confuse it with `<strong>`, the former denotes content has a degree of **relevance**, the latter denotes text of **importance**.

---

### `<nav>`

Provide navigation links.

#### Examples

- menus
- table of contents(toc)
- indexes

#### Usage

- For a major block of navigation links, not for all the links
- A doc can have several `<nav>` elements

---

### `<section>`

Represents a generic standalone section of a document; should always have a heading.

#### Usage

- Only be used if there are no more specific elements to represent it.
- There are better choices:
  - represents the main content? Use `<main>`
  - represents tangential info? Use `<aside>`
  - represents an atomic unit of content related to the main flow? Use `<article>`
  - used for styling wrapper, use `<div>`

---

### `<time>`

#### Attribute

- `datetime`

#### Usage

- Presenting dates and times in a machine-readable format.
- Don't use it for dates prior to the introduction of the Gregorian calendar

---

## Semantic Attributes

### `role`

The `role` attribute describes the role an element has in the context of the document. It is a global attribute, meaning it's valid for every element, defined by the ARIA spec.

It helps build the AOM(Accessibility Object Model).

---

## Why semantics?

The benefits of writing semantic markup are as follows:

- **Better SEO**: A web app built with semantics would be considered important by a search engine.
- **Better A11y**:
  - Screen readers can use it easily than without semantics.
  - Semantic tags like `<header>`, `<nav>`, `<main>`, `<footer>` can create semantic landmarks which provide structure to web content and ensure important sections of content are keyboard-navigable for screen reader users.
- **Better Readability**:
  - Developers can use search to quickly find targeted elements
  - Avoid a large number of `<div>`s

---

# Content categories

When writing the semantic elements, it's beneficial to keep **content categories** in mind. It helps to define the <em>content model</em> of elements.
You can check it at [Content categories - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#sectioning_content).

![Venn diagram of 7 main content categories](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories/content_categories_venn.png)

Basically, there are 7 types:

- **Metadata content**: modify the presentation or the behavior of the rest of the doc, set up links to other docs, convey out-of-band info.
  - Examples:
    - `<base>`
    - everything in `<head>`: `<link>`, `<meta>`, `<script>`, `<style>`, `<title>`
- **Flow content**: most elements inside the `<body>`
  - Examples:
    - heading elements, sectioning elements, phrasing elements, embedding elements, interactive elements, and form-related elements.
- **Sectioning content**: a subset of flow content, creates a section in the current outline defining the scope of `<header>` and `<footer>` elements.
  - Examples:
    - `<article>`, `<aside>`, `<nav>`, `<section>`
- **Heading content**: a subset of flow content, defines the title of a section.
  - Examples:
    - `<h1>` - `<h6>`
    - `<hgroup>`
- **Phrasing content**: a subset of flow content, text, and markup within a document.
- **Embedded content**: a subset of flow content, imports another resource or inserts content from another markup language or namespace into the document.
  - Examples:
    - `<audio>`, `<video>`, `<iframe>`, `<svg>`, `<img>`, `<embed>`, `<canvas>`, `<picture>`
- **Interactive content**: a subset of flow content, designed for user interaction.
  - Examples:
    - `<button>`, `<label>`, `<details>`, `<select>`, `<textarea>`

---

# Tools

- You can use the [validator](https://validator.w3.org/#validate_by_input+with_options) to validate your `HTML` code.
- You can switch to [Accessibility Tree View](https://developer.chrome.com/docs/devtools/accessibility/reference#explore-tree) in Chrome DevTools `Element` panel.

---

# Reference

- [Semantics - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Semantics (computer science) - Wikipedia.org](<https://en.wikipedia.org/wiki/Semantics_(computer_science)>)
- [Semantic HTML](https://web.dev/learn/html/semantic-html)
