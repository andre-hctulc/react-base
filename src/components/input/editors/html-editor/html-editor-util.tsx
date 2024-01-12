const CssBorder = "hilfeRahmen";

export function runCommand(cmd: string, arg?: string | null, event?: React.MouseEvent | React.ChangeEvent) {
    if (!cmd || !getEditableSelection()) return;
    event?.preventDefault(); // Avoids loosing focus from the editable area
    document.execCommand(cmd, false, arg || undefined);
}

export function getTextFormat(cmd: string): string {
    if (!getEditableSelection()) return "";
    return document.queryCommandValue(cmd);
}

export function getEditableSelection(): Selection | undefined {
    const sel = document.getSelection();
    const ctl = sel?.focusNode as HTMLElement;

    if (!ctl || !sel) return undefined;

    let vater: HTMLElement | null = ctl;

    while (vater) {
        if (vater.contentEditable) return sel;
        vater = vater.parentElement;
    }

    return undefined;
}

export function insertTable(zeilen: number, spalten: number) {
    const sel = getEditableSelection();
    const table = document.createElement("table");

    if (!sel || !sel.focusNode) return;

    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    for (let zeile = 1; zeile <= zeilen; zeile++) {
        const row = document.createElement("tr");
        table.appendChild(row);

        for (let spalte = 1; spalte <= spalten; spalte++) {
            const zelle = document.createElement("td");
            zelle.classList.add(CssBorder);
            zelle.textContent = spalte.toString();

            row.appendChild(zelle);
        }
    }

    sel.focusNode.appendChild(table);
}

export function insertRow() {
    let actRow: HTMLTableRowElement | undefined = undefined;

    const sel = getEditableSelection();
    if (!sel || !sel.focusNode) return;

    let ctl: HTMLElement | null = sel.focusNode.parentNode as HTMLElement | null;

    while (ctl) {
        if (ctl.tagName == "TR") actRow = ctl as HTMLTableRowElement;
        else if (ctl.tagName == "TABLE" || ctl.tagName == "TBODY") break;
        ctl = ctl.parentNode as HTMLElement | null;
    }

    if (!ctl || !actRow) return;

    const firstZelle = actRow.firstElementChild as HTMLTableCellElement;

    const row = document.createElement("tr");

    for (let spalte = 1; spalte <= actRow.childElementCount; spalte++) {
        const zelle = document.createElement("td");
        if (firstZelle && firstZelle.classList.contains(CssBorder)) zelle.classList.add(CssBorder);
        zelle.textContent = spalte.toString();

        row.appendChild(zelle);
    }

    ctl.appendChild(row);
}

export function insertCol() {
    const sel = getEditableSelection();
    if (!sel || !sel.focusNode) return;

    let ctl = sel.focusNode.parentNode as HTMLElement | null;

    while (ctl) {
        if (ctl.tagName == "TABLE" || ctl.tagName == "TBODY") break;
        ctl = ctl.parentNode as HTMLElement | null;
    }

    if (!ctl) return;

    let row = ctl.firstElementChild as HTMLTableRowElement;

    while (row) {
        const firstZelle = row.firstElementChild as HTMLTableCellElement;
        const zelle = document.createElement("td");

        if (firstZelle && firstZelle.classList.contains(CssBorder)) zelle.classList.add(CssBorder);
        zelle.textContent = (row.childElementCount + 1).toString();

        row.appendChild(zelle);

        row = row.nextElementSibling as HTMLTableRowElement;
    }
}

export function changeBorder() {
    const sel = getEditableSelection();

    if (!sel || !sel.focusNode) return;

    let ctl = sel.focusNode.parentNode as HTMLElement;

    while (ctl) {
        if (ctl.tagName == "TABLE" || ctl.tagName == "TBODY") break;
        ctl = ctl.parentNode as HTMLElement;
    }

    if (!ctl) return;

    let row = ctl.firstElementChild as HTMLTableRowElement;

    while (row) {
        let zelle = row.firstElementChild as HTMLTableCellElement;

        while (zelle) {
            if (zelle.classList.contains(CssBorder)) zelle.classList.remove(CssBorder);
            else zelle.classList.add(CssBorder);

            zelle = zelle.nextElementSibling as HTMLTableCellElement;
        }

        row = row.nextElementSibling as HTMLTableRowElement;
    }
}

export function editorInsertLink(range: Range, href: string, label: string, newPage: boolean) {
    const link = document.createElement("a");

    link.href = href;
    link.text = label;
    link.className = "classHelpLink";

    if (newPage) link.target = "_blank";

    range.deleteContents();
    range.insertNode(link);
}

export function editorInsertText(range: Range, text: string) {
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
}

export function editorInsertHTML(range: Range, html: string) {
    const entry = document.createElement("div");

    entry.innerHTML = html;
    range.deleteContents();
    range.insertNode(entry);
}
