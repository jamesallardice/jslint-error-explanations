/*global $ */

$(function () {

	"use strict";

	var input = $("#filter"),
		postColumns = $(".posts"),
		error = $("#error"),
		posts = postColumns.find("li"),
		rMultiSpaces = /\s{2,}/g;

	input.val("").on("keyup", function () {

		var search = this.value.toLowerCase(),
			newColumn1 = $("<ul class='posts dynamic' />"),
			newColumn2 = newColumn1.clone(),
			perColumn,
			visible;

		$(".posts.dynamic").remove();
		postColumns.hide();

		visible = posts.filter(function () {
			return $(this).find("h3").text().toLowerCase().indexOf(search.replace(rMultiSpaces, " ")) > -1;
		});

		if (visible.length) {
			error.hide();

			perColumn = Math.ceil(visible.length / 2);

			postColumns.eq(0).before(newColumn1);
			postColumns.eq(1).before(newColumn2);

			visible.each(function (i) {
				if (i < perColumn) {
					newColumn1.append(visible.eq(i).clone().show());
				} else {
					newColumn2.append(visible.eq(i).clone().show());
				}
			});

		} else {
			error.show();
		}

	});

});