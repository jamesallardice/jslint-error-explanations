(function () {

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
		},
		jslintSelection = [
			"<div id='linter-choice-lint' class='btn-group' style='float: left'>",
				"<button class='btn btn-mini dropdown-toggle jslint-choice-lint' data-toggle='dropdown'>",
					"JSLint ",
					"<span class='caret'></span>",
				"</button>",
				"<ul class='dropdown-menu'>",
					"<li><span class='heading'>JSLint Version</span></li>",
					"<li class='divider'></li>",
					"<li data-file='jslint-20121217.min.js'><a href='#'>2012-12-17 (Latest) <i class='icon-ok'></i></a></li>",
					"<li data-file='jslint-20121214.min.js'><a href='#'>2012-12-14</a></li>",
					"<li data-file='jslint-20120713.min.js'><a href='#'>2012-07-13</a></li>",
				"</ul>",
			"</div>"
		].join(""),
		jshintSelection = [
			"<div id='linter-choice-hint' class='btn-group' style='float: left'>",
				"<button class='btn btn-mini btn-inverse dropdown-toggle jslint-choice-hint' data-toggle='dropdown'>",
					"JSHint ",
					"<span class='caret'></span>",
				"</button>",
				"<ul class='dropdown-menu'>",
					"<li><span class='heading'>JSHint Version</span></li>",
					"<li class='divider'></li>",
					"<li data-file='jshint-r12.min.js'><a href='#'>r12 (Latest)</a></li>",
					"<li data-file='jshint-r11.min.js'><a href='#'>r11</a></li>",
					"<li data-file='jshint-r10.min.js'><a href='#'>r10</a></li>",
					"<li data-file='jshint-r09.min.js'><a href='#'>r09</a></li>",
					"<li data-file='jshint-r08.min.js'><a href='#'>r08</a></li>",
					"<li data-file='jshint-r07.min.js'><a href='#'>r07</a></li>",
				"</ul>",
			"</div>"
		].join("");

	$(function () {
		$("textarea").each(function () {
			var $this = $(this),
				linter = $this.data("linter") || "JSLint",
				file = $this.data("file"),
				mirror;
			$this.wrap("<div class='row'><div class='jslint span12'><div class='row'><div class='span7'></div></div></div></div>");
			$this.closest(".row").append("<div class='jslint-output span5'><div class='jslint-result'><span class='result-output'></span><div class='jslint-choice pull-right'>" + jslintSelection + " " + jshintSelection + "</div></div><div class='jslint-messages'></div></div>");
			if (linter === "JSHint") {
				$("#linter-choice-hint").find("button").removeClass("btn-inverse").end().find("li[data-file] a").append(" <i class='icon-ok'></i>");
				$("#linter-choice-lint").find("button").addClass("btn-inverse").end().find("li[data-file] i").remove();
			}
			mirror = CodeMirror.fromTextArea(this, codeMirrorOpts);
			$this.data("cmInstance", mirror);
			if (file) {
				$.getScript("/assets/linters/" + linter.toLowerCase() + "/" + file, function () {
					$("#linter-choice-" + (linter === "JSLint" ? "lint" : "hint")).find("i.icon-ok").remove().end().find("li[data-file='" + file + "'] a").append(" <i class='icon-ok'></i>");
					runLint(mirror, linter);
				});
			} else {
				runLint(mirror, linter);
			}
		});
		$(".dropdown-toggle").dropdown();
		$("body").on("click", ".jslint-choice .btn-group li", function (e) {
			var $this = $(this),
				btnGroup = $this.closest(".btn-group"),
				isLint = $this.closest(".btn-group").attr("id") === "linter-choice-lint",
				script = "/assets/linters/" + (isLint ? "jslint" : "jshint") + "/" + $this.data("file");
			e.preventDefault();
			$this.closest(".jslint-result").next().empty().append("<p><img src='/assets/images/loading.gif' alt='Loading'> Working...</p>");
			if (window.location.hostname === "localhost") {
				// Dev mode, use unminified files
				script = script.replace(".min", "");
			}
			if (btnGroup.find(".btn").hasClass("btn-inverse")) {
				btnGroup.find(".btn").removeClass("btn-inverse");
				btnGroup.siblings(".btn-group").find(".btn").addClass("btn-inverse");
				btnGroup.siblings(".btn-group").find("li[data-file] i").remove();
			} else {
				$this.closest("ul").find("li[data-file] i").remove();
			}
			$this.find("a").append(" <i class='icon-ok'></i>");
			$.getScript(script, function () {
				runLint($this.closest(".jslint-output").prev().find("textarea").data("cmInstance"), isLint ? "JSLint" : "JSHint");
			});
		});
	});

}());