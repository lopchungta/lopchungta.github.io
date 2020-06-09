$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
		playPauseButton = $("#play-pause-button"),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "H2K, KN",
		name: "Tháng Năm Không Quên",
		url: "Musics/Thang-Nam-Khong-Quen-H2K-KN.mp3",
		picture: "https://avatar-nct.nixcdn.com/song/2019/07/24/9/8/2/d/1563936146356_640.jpg"
	}, {
        artist: "Gryffin ft. Maia",
        name: "Body Back",
        url: "Musics/BodyBack.mp3",
        picture: "img/Ephoto360.com_15ed737148e9ce.jpg",
    }, {
        artist: "Sơn Tùng M-TP",
        name: "Tiến Lên Việt Nam ƠI",
        url: "Musics/Tien-Len-Viet-Nam-Oi-Son-Tung-M-TP.mp3",
        picture: "https://zmp3-photo.zadn.vn/thumb/240_240/avatars/e/e/ee58fcc0ff45002b8d416bd7685809ce_1487040461.jpg"
    }, {
        artist: "Jack, K-ICM",
        name: "Việt Nam Tôi",
        url: "Musics/Viet-Nam-Toi-Jack-K-ICM.mp3",
        picture: "https://gamek.mediacdn.vn/2019/12/3/thay-avar-1575341602274242419043.jpg"
	}, {
        artist: "Sơn Tùng M-TP",
        name: "Như Ngày Hôm Qua",
        url: "Musics/Nhu-Ngay-Hom-Qua-Son-Tung-M-TP.mp3",
        picture: "https://lh3.googleusercontent.com/5gdXZ_z_Cq6_trCyCoPzSA6ROM_fViqFe_qVfPTc0cA5qOGxuAyTVZ-iDjhaRYz1tksITYB4258zJUcGtMWEmzD6NQV8-pd9XoLPSaRZfHmxFuVpDEeyUgnjKR8bk9ega25R6osLxReagUClJUJhWzzbBhSiKcDzyOTk_OKMcqmPJZUyMB-otmla7NHTW2OlyKyVy9Mobi3R10Ms2NYHaLDq9RRuL1PcDs53D9GdktEr8aHBVsvJuoU6dtpi8sThVmXTI9X0agLHLznxx0OKMoh8Rz5GH9PfGFj0PtEa5-P-1hoKtEoVJ9aqcNSHGaFYOszqeJK-L2CpFwqm7SoOX4Hu0Z6PuInW9pIE1hYgDO_FQKhu0SglC4-Gnrvd0LbCWI9snQwq4IgF-cObbaouDbSLuKSxonJ3vAWv_YnsoKqIVqy2xfZvKX4IBWmSBKGBwNa3M-dEVpnCtNigQUyCvAq5h8bois4W8kEafUMux1zk7skU_MmTXm6Y5oXrdruHGmqVCOR-ZGiQHJC8ne1d39ulBUtbB_BXsnMdEb3Hage2PetUYmv3tveafVzOqu8RiDe6gZ2iCuZ4wj8fqGbomYK47kpu3IASAmKzO3Ld5LII-YwvrXCsgrI45up6YLk-pt9_oePnd_MyVOiTpd0hoRDCMIkpqcSdgpMOgRWZx3bdMHOm7nIUE77Kh1pm=w868-h651-no?authuser=0"
    }, {
        artist: "Ngọc Châu",
        name: "Nơi Ta Thuộc Về",
        url: "Musics/NoiTaThuocVe-NgocChau-2599632.mp3",
        picture: "https://lh3.googleusercontent.com/Lm4wtUHEgeZoMdvAeaw8CGCXAvz-Ygjtrqka9wdTdif11tY6YAtPM_UHzzF9Jo-28X1fZ0m-RtbY1VmOiUOLTlgE1yL27DQkG4fPXDC8LIH7Lh7-T3GNdcZmwtX9y4ubC3OXK-4s25hIpF_msmcuZOF-yc1KzKpQUV2lmnmKmsAt-jfQRSjI_c97YEJxlwCCxPXTQOM4L--pTIVrnqtFhqhp2Ivpq7U4w7c6sQT4PRhVbB_zYwotuHNsZ-aPTkfmo_M5Bw7BU2Y77IUwYvRZg5cWLZY5ba6AxRiOMLxWPgejLo4aFPIGZwOxGHciTNIDXPbj8kU6VtVreWAKvHQjz72fSihTJDVQiL-QIrKMAhMiFH3_c0_vvsXuXmok6iDULDqVEVnWiXJ-7h40FqHOQD8tvfrOI1hGyqNLlCQEb8NkCTAuk8flIA4jOeB5tbhMbOla2EGxjcmmldK6R3vORYG9IUbX44tV94zBbvBzpHyn7Is12W3D6EOgzXtAShTO-qJD9dkz3Kj3VR2YxEQ2Qh3iEt9bNRsyLG_GwlsnvwBjru646mjQG57CRQaPd6XEEur-OgiBY5gMesbgkZaX3K6deGqZK8msAzc7EGmzU9NTEeHx8jWezBgpyR2IE_kDCFA6_Rq4cFy9XcohYuoe6y1Juv3ZgWDQcBmYxEBbqkqvIjJv0JtGL6j24p6s=w868-h651-no?authuser=0"
    }, {
        artist: "China EDM",
        name: "China EDM - Diesi Rexim",
        url: "Musics/「 ΣDM 」 ★ China EDM ★ 清丶风 - DiESi Remix ♫.mp3",
        picture: "https://i.sozcu.com.tr/wp-content/uploads/2019/10/31/iecrop/panda_1_1_1572542028-400x400.jpg"
    }, {
        artist: "365DaBand",
        name: "Bống Bống Bang Bang",
        url: "Musics/Bong-Bong-Bang-Bang-Tam-Cam-Chuyen-Chua-Ke-OST-365DaBand.mp3",
        picture: "https://upload.wikimedia.org/wikipedia/vi/6/61/B%C3%ACa_%C4%91%C4%A9a_B%E1%BB%91ng_b%E1%BB%91ng_bang_bang.png"
    }, {
        artist: "China EDM",
        name: "China P",
        url: "Musics/China-P - 我是爱音乐的徐梦圆.mp3",
        picture: "https://i.sozcu.com.tr/wp-content/uploads/2019/10/31/iecrop/panda_1_1_1572542028-400x400.jpg"
    }, {
        artist: "Emily Hạnh Sino",
        name: "Cô Tấm Ngày Nay",
        url: "Musics/Co-Tam-Ngay-Nay-DuongK-Remix-Emily-Hanh-Sino.mp3",
        picture: "img/Ephoto360.com_15ed737148e9ce.jpg"
    }, {
        artist: "Trúc Nhân",
        name: "Ngồi Hát Đỡ Buồn",
        url: "Musics/Ngoi-Hat-Do-Buon-Co-Gai-Den-Tu-Hom-Qua-OST-Truc-Nhan.mp3",
        picture: "https://photo-zmp3.zadn.vn/covers/8/d/8d0e9de9056dc4f3a6aac5f3dfad1b8d_1499396093.jpg"
    }, {
        artist: "Alan Walker",
        name: "Routine",
        url: "Musics/Routine-AlanWalkerDavidWhistle-4698726.mp3",
        picture: "https://avatar-nct.nixcdn.com/song/2017/10/20/a/9/1/8/1508495860568_640.jpg"
    }, {
        artist: "Minh Beta",
        name: "Việt Nam Ơi",
        url: "Musics/Viet-Nam-Oi-Minh-Beta.mp3",
        picture: "https://avatar-nct.nixcdn.com/song/2018/01/28/0/b/a/5/1517121601303_640.jpg"
    }, {
        artist: "Shaun",
        name: "Way Back Home",
        url: "Musics/Way-Back-Home-Shaun.mp3",
        picture: "https://zmp3-photo-fbcrawler.zadn.vn/cover/0/a/7/c/0a7c640931118fa4d1ad294967842c44.jpg"
    }, {
        artist: "Hoàng Thuỳ Linh",
        name: "Để Mị Nói Cho Mà Nghe",
        url: "Musics/De Mi Noi Cho Ma Nghe - Hoang Thuy Linh [128kbps_MP3].mp3",
        picture: "https://image2.tienphong.vn/665x449/Uploaded/2020/fcivbcvo/2019_09_05/tien_phong_nu_sinh_khai_giang_dai_dien_drzg.jpg"
    }];

	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', currArtwork);
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audio = new Audio();

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
});
