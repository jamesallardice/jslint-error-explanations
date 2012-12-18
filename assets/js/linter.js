function runLint(editor, tool) {
	var editorInput = $(editor.getInputField()),
		codeMirror = editorInput.closest(".CodeMirror"),
		outputHolder = editorInput.closest(".jslint").find(".jslint-output"),
		messageHolder = outputHolder.find(".jslint-messages"),
		jslintopts = codeMirror.prev().data("jslintopts") || {},
		result = tool === "JSLint" ? JSLINT(editor.getValue(), jslintopts) : JSHINT(editor.getValue(), jslintopts),
		errors = tool === "JSLint" ? JSLINT.errors : JSHINT.errors,
		numErrors = errors.length,
		output,
		i;
	outputHolder.find(".result-output").text(function () {
		return tool + (result ? " found no errors." : " found errors.");
	}).parent().removeClass("jslint-result-success jslint-result-error").addClass(function () {
		return result ? "jslint-result-success" : "jslint-result-error";
	});
	messageHolder.empty();
	for (i = 0; i < numErrors; i++) {
		output = "";
		if (errors[i]) {
			output += "<p><span>Line " + errors[i].line + ":</span> ";
			output += $("<div>").text(errors[i].reason).html();
			output += "</p>";
			messageHolder.append(output);
		}
	}
}

var codeMirrorOpts = {
	indentWithTabs: true,
	indentUnit: 4,
	lineNumbers: true,
	fixedGutter: true,
	lineWrapping: true,
	onKeyEvent: function (editor) {
		runLint(editor, $(editor.getInputField()).closest(".jslint").find(".jslint-choice-lint").hasClass("btn-inverse") ? "JSHint" : "JSLint");
	}
};

$(function () {
	$("textarea").each(function () {
		var $this = $(this),
			linter = $this.data("linter") || "JSLint";
		$this.wrap("<div class='row'><div class='jslint span12'><div class='row'><div class='span7'></div></div></div></div>");
		$this.closest(".row").append("<div class='jslint-output span5'><div class='jslint-result'><span class='result-output'></span><span class='jslint-choice pull-right'><button class='btn btn-mini jslint-choice-lint'>JSLint</button> <button class='btn btn-mini jslint-choice-hint'>JSHint</button></div><div class='jslint-messages'></div></div>").find(linter === "JSLint" ? ".jslint-choice-hint" : ".jslint-choice-lint").addClass("btn-inverse");
		var mirror = CodeMirror.fromTextArea(this, codeMirrorOpts);
		$this.data("cmInstance", mirror);
		runLint(mirror, linter);
	});
	$("body").on("click", ".jslint-choice-lint", function () {
		var $this = $(this);
		$this.removeClass("btn-inverse").next().addClass("btn-inverse");
		runLint($this.closest(".jslint-output").prev().find("textarea").data("cmInstance"), "JSLint");
	}).on("click", ".jslint-choice-hint", function () {
		var $this = $(this);
		$this.removeClass("btn-inverse").prev().addClass("btn-inverse");
		runLint($this.closest(".jslint-output").prev().find("textarea").data("cmInstance"), "JSHint");
	});
});