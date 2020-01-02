import { ContentPart, Renderer, isExample } from "../common";
import { Example, Examples, ExamplesRoot } from "../../types";
import { formatMD } from "../format";
import { relative } from "path";

function linesToContent(lines: string[]): string {
  return formatMD(lines.join("\n"));
}

function image(title: string, src: string, href?: string): string {
  return href == null
    ? `![${title}](${src})`
    : link(href, `![${title}](${src})`);
}

function link(href: string, text: string = href): string {
  return `[${text}](${href})`;
}

function header(level: number, text: string): string {
  return `${"#".repeat(level)} ${text}`;
}

function generateJSFiddle(example: Example): string {
  return link(example.paths.jsfiddle.web, "JSFiddle");
}

function generateCodePen(example: Example): string {
  return link(example.paths.codepen.web, "CodePen");
}

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
          generateJSFiddle(example),
          generateCodePen(example)
        ].join(" | "),
        ""
      );
    } else {
      sections.push(
        ...processGroup(example, output, key, collator).map(
          (contentPart): ContentPart => ({
            ...contentPart,
            filename: filenamePart + "." + contentPart.filename
          })
        )
      );
    }
  }

  return [
    {
      content: linesToContent([header(1, title), "", ...items]),
      filename: filenamePart + ".md",
      title
    },
    ...sections
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
          )
        ]),
        filename: "README.md",
        title: "Examples"
      },
      ...sections
    ];
  },
  screenshot: {
    width: 740,
    height: 250
  }
};
