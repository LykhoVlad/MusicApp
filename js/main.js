const dbPost = "http://localhost:3000/post";
const dbPlaylist = "http://localhost:3000/MyPlaylist";
const dbHotlist = "http://localhost:3000/Hotlist";

const renderSection = (dataAddress) => {
	$.ajax(dataAddress, {
		method: "GET",
		success: (data) => {
			const dataReverse = data.reverse();
			_.each(dataReverse, post => {
				createCard(post);
			});
		}
	});
};

// CREATE MUSIC CARD START
const createCard = (post) => {
	const clonedElement = $("#album")
		.clone()
		.prop("id", post.guid)
    	.appendTo("#musicContainer");
    
    clonedElement.find(".albumImg")
    	.prop("src", post.imgUrl);
    
    clonedElement.find(".musName")
    	.text(post.author);
    
	clonedElement.find(".musTitle")
		.text(post.title);

	clonedElement.find("#playButton")
    	.prop("id", post["id"]);
    
    clonedElement.find("#addToMyPlaylist")
		.prop("id", post["id"])


    .click((event) => {
			clonedElement
				.find(".addB")
				.prop("disabled", true);

			const targetId = event.target.id;
			addToMyPlayList(targetId);
		});

	clonedElement.find(".time")
		.text(post.time);
	
	clonedElement.find(".infoPop")
		.prop("id", post["id"]+1)

	clonedElement.find(".popup-info")
		.prop("id", post["id"]+2)
};
// CREATE MUSIC CARD END

// CREATE PAGE START
const createPageSection = (event) => {
	const section = event.target.id;
	$("#musicContainer").html("");
	switch (section) {
		case "home":
			renderSection(dbPost);
			break;
		case "hot":
			renderSection(dbHotlist);
			break;
		case "myplay":
			renderSection(dbPlaylist);
			break;
	}
};
// $(document).ready(function(){
// 	$(".trigger").click(function(){
// 	$(".dl-menu").slideToggle();
//    })
// })

$(() => {
	renderSection(dbPost);
		const navLink = $("#navigation");

	_.each(navLink.children(), link => {
		$(link).click(createPageSection);
	});
	
});
// CREATE PAGE END

// ADD TO PLAYLIST START
const addToMyPlayList = (targetId) => {
	let item;

	$.get(dbPost, data => {
		item = _.findWhere(data, {
			"id": "" + targetId
		});

		$.get(dbPlaylist, data => {
			if (!_.findWhere(data, {
					"id": "" + targetId
				}) && item !== undefined && item !== null) {
				$.post(dbPlaylist, item);
			}
		});
	});
};
// ADD TO PLAYLIST END

//NAVIGATION MENU START
$(document).ready(function(){
	$('#menu').mouseover(function(){
			$(this).css("left", "0%" );
	});
	$('#menu').mouseout(function(){
			$(this).css("left", "-17%" );
	});
})
//NAVIGATION MENU END

// MODAL WINDOW START
$('#addNewMCard').click(function(){
	$('#musicContainer').css('filter', 'blur(5px)');
	$('#menu').fadeOut();
	$('.modal').fadeIn();
});

$('#close-btn').click(function(){
	$('.modal').fadeOut();
	$('#menu').fadeIn();
	$('.contain').css('filter', 'none');
});

// MODAL WINDOW END
// ADD MUSIC CARD FROM FORM START
const addNewCard = () => {
	const createId =  Math.round (Math.random()*1e24);
	const createGuid = (function(){
		function s4(){
			return Math.floor((1+Math.random())*0x10000).toString(16);
		}
		return function(){
			return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
		};
	})();

	const newData = {};
	
	newData.id = createId;
	newData.guid = createGuid();
	newData.imgUrl = $("#cardImgUrl").val();
	newData.author = $("#cardAuthor").val();
	newData.playlists = $("#cardPlaylist").val();
	newData.time = $("#cardTime").val();
	newData.title = $("#cardTitle").val();

	$('#musicContainer').css('filter', 'blur(0px)');
	$('.modal').fadeOut();
	$('#menu').fadeIn();
	$('.contain').css('filter', 'none');

	$.ajax({
		type: "POST",
		url: dbPost,
		data: newData,
		success: createCard,
		error: function (jqXHR, textStatus, errorThrown){
			alert("Request failed: " + textStatus);
		}
	  });
	  
};
// ADD MUSIC CARD FROM FORM END
// VALIDATION START
function checkInput(){
	let inputImgUrl = $("#cardImgUrl").val();
	let inputAuthor = $("#cardAuthor").val();
	let inputPlaylists = $("#cardPlaylist").val();
	let inputTime = $("#cardTime").val();
	let inputTitle = $("#cardTitle").val();

	if(inputImgUrl.trim() !== "" & inputAuthor.trim() !== "" & inputPlaylists.trim() !== "" & inputTime.trim() !== "" & inputTitle.trim() !== "" ){
		$('#save-btn').css('background-color', '#58F7F6');
		$('#save-btn').attr('disabled', false);
	} else{
		$('#save-btn').css('background-color', 'grey');
		$('#save-btn').attr('disabled', true);
	}
}
// VALIDATION END
// POPUP START
// $('.info-input').click(function(){
// 	$('#musicContainer').css('filter', 'blur(5px)');
// 	$('#menu').fadeOut();
// 	$('.popup-info').fadeIn();
// });

// $('#close-popup').click(function(){
// 	$('.popup-info').fadeOut();
// 	$('#menu').fadeIn();
// 	$('.contain').css('filter', 'none');
// });

$('#5ce2f7f8f7c37804b31eb7b21').click(function(){
	$('#musicContainer').css('filter', 'blur(5px)');
	$('#5ce2f7f8f7c37804b31eb7b22').fadeIn();
});
$('.overlay_popup').click(function(){
	$('.overlay_popup, .infoPop').hide();
})

// POPUP END
