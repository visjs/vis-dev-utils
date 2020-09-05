import { ContentPart, Renderer, isExample } from "../common";
import { Examples, ExamplesRoot } from "../../types";
import { formatMD } from "../format";
import { relative } from "path";

/**
 * @param lines
 */
function linesToContent(lines: string[]): string {
  return formatMD(lines.join("\n"));
}

/**
 * @param title
 * @param src
 * @param href
 */
function image(title: string, src: string, href?: string): string {
  return href == null
    ? `![${title}](${src})`
    : link(href, `![${title}](${src})`);
}

/**
 * @param href
 * @param text
 */
function link(href: string, text: string = href): string {
  return `[${text}](${href})`;
}

/**
 * @param level
 * @param text
 */
function header(level: number, text: string): string {
  return `${"#".repeat(level)} ${text}`;
}

/**
 * @param examples
 * @param output
 * @param title
 * @param collator
 */
function processGroup(
  examples: Examples,
  output: string,
  title: string,
  collator: Intl.Collator
): ContentPart[] {
  const items: string[] = [];
  const sections: ContentPart[] = [];
  const filenamePart = title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

  for (const key of Object.keys(examples).sort(collator.compare)) {
    const example = examples[key];

    if (isExample(example)) {
      // An example in this group.
      items.push(
        header(2, key),
        "",
        image(
          key,
          "./" + relative(output, example.paths.screenshot.local),
          example.paths.page.web
        ),
        "",
        [
          link(example.paths.page.web, "Open"),
          link(example.paths.jsfiddle.web, "JSFiddle"),
          link(example.paths.codepen.web, "CodePen"),
        ].join(" | "),
        ""
      );
    } else {
      // A subgroup of examples.
      sections.push(
        ...processGroup(example, output, key, collator).map(
          (contentPart): ContentPart => ({
            ...contentPart,
            filename: filenamePart + "." + contentPart.filename,
          })
        )
      );
    }
  }

  return [
    {
      content: linesToContent([header(1, title), "", ...items]),
      filename: filenamePart + ".md",
      title,
    },
    ...sections,
  ];
}

export const mdRenderer: Renderer = {
  render(
    examples: ExamplesRoot,
    output: string,
    _title: string,
    collator: Intl.Collator
  ): ContentPart[] {
    const sections: ContentPart[] = [];

    for (const key of Object.keys(examples).sort(collator.compare)) {
      sections.push(...processGroup(examples[key], output, key, collator));
    }

    return [
      {
        content: linesToContent([
          header(1, "Examples"),
          "",
          ...sections.map(
            ({ filename, title }): string => "- " + link("./" + filename, title)
          ),
        ]),
        filename: "README.md",
        title: "Examples",
      },
      ...sections,
    ];
  },
  screenshot: {
    width: 740,
    height: 250,
  },
};
