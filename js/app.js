var varqa_api_url=sessionStorage.getItem("varqaapiurl");var myuser=localStorage.getItem("varqauser");var mypass=localStorage.getItem("varqapass");function change_group(g_id){gid=g_id;dgid=g_id;localStorage.setItem("gid",g_id);$("#matlab").html("");localStorage.setItem("last_count",0);localStorage.setItem("last_mess",0);get_group_info();get_group_info(true);get_all_data();ajx(true);wajx(false);wajx();closemymenu();$('#mess').select()}function this_type(mygid,blocked,author){if(blocked==true){var send_box='<div class="messbox"><button onclick="varqa_group_unblock('+mygid+', '+author+')"  class="cbutton">Unblock</button></div>'}else{if(author==true){var send_box='<div class="messbox"><textarea id="mess" placeholder="Enter text..." autocomplete="off" rows="1" autofocus></textarea><input id="subm" name="submit" type="submit" value=">" class="button"><a href="send_file/"><button id="fileb" class="button">+</button></a><button style="width: 3em;" class="button" onclick="myoptions()">|||</button></div>'}else{var send_box='<div class="messbox"><button onclick="varqa_group_delete('+mygid+')" class="cbutton">Leave</button></div>'}}var g_options='<button onclick="varqa_group_block('+mygid+', '+author+')" class="hbutton" style="top: 46%;">Block</button><button onclick="varqa_group_delete('+mygid+')" class="hbutton" style="top: 54%;">Leave</button>';$("#goptions").html(g_options);$(".container").html(send_box)}function wajx(check=true){$.ajax({type:'GET',url:varqa_api_url+'get/groups/',headers:{varqauser:myuser,varqapass:mypass},data:{group_id:"all",check:check},dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){ajx();$(".mainmenu").empty();$.each(data.results,function(i,val){if(val==null){$(".mainmenu").append('Empty...');return}var stl='background-color: #7a7f83; color:black;';if(val.gid==gid){if(check==false){this_type(val.gid,val.blocked,val.author)}var stl='background-color:#166484; color:#f5f5f5;'}else{if(val.not_reads_count>0){var stl='background-color:black; color:#f5f5f5;'}}if(val.type=='private'){if(val.member_count==2){var members='OK';var members_title='OK'}else{var members='Left';var members_title='Left!'}}else{var members=val.member_count;var members_title=val.member_count+' member'}if(val.not_reads_count==0){var not_reads='All messages read'}else{var not_reads=val.not_reads_count+' messages not read'}var last_message=val.last_message;if(last_message!=null){if(last_message.author!=null){if(last_message.content=='file'){if(last_message.author=='you'){var zirmatn='You: File'}else{var zirmatn=last_message.author+': File'}}else{if(last_message.author=='you'){var zirmatn='You: '+last_message.content}else{var zirmatn=last_message.author+': '+last_message.content}}}else{var zirmatn=(last_message.content=='file')?'File':last_message.content}}else{var zirmatn='Empty'}var mycontent=zirmatn.replace(/(?:\<code\>|\<\/code\>|`)/g,'');var one_message='<button title="Right click to copy token" oncontextmenu="javascript:varqatokencopy(\''+val.group_login_info.token+'\', \''+val.group_login_info.admintoken+'\');return false;" onclick="change_group('+val.gid+')" class="mensub" style="'+stl+'"><p title="'+members_title+'" class="ozv">'+members+'</p><p title="'+not_reads+'" class="new">'+val.not_reads_count+'</p><p class="matn">'+val.title+'</p><p class="zirmatn"><i>'+mycontent+'</i></p><input style="display: none;" type="text" value="'+val.group_login_info.token+'" id="'+val.group_login_info.token+'"></button><br>';$(".mainmenu").append(one_message)})}}});if($("p").hasClass("dat2")){reads()}if(check==false){return}t=setTimeout(wajx,5000)}function myoptions(){$("#goptions").css("display","block")}function varqatokencopy(token,admintoken){if(token!='null'){var thistoken=document.getElementById(token);thistoken.style.display="block";thistoken.select();thistoken.setSelectionRange(0,99999);document.execCommand("copy");thistoken.style.display="none";var mytokenalert=(admintoken!='null')?"Copied in clipboard \n Channel admin builder token: \n"+admintoken:"Copied in clipboard";alert(mytokenalert)}else{alert("Permission denied!!!")}}function motmaen(){if(confirm("Are you sure???!!!")){return true}else{return false}}function sendm(){var m=$('#mess').val();mstr=m.replace(/(?:\r\n|\r|\n)/g,'\\\\n');$.ajax({type:'POST',url:varqa_api_url+'insert/',headers:{varqauser:myuser,varqapass:mypass},data:'{"content": "'+mstr+'", "group_id": '+gid+'}',dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){ajx();$('#mess').val('');$('#mess').select()}}})}function create_contact(){var cont=$('#usertel').val();$.ajax({type:'POST',url:varqa_api_url+'private/',headers:{varqauser:myuser,varqapass:mypass},data:'{"contact": "'+cont+'"}',dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){$('#usertel').val('');$(".modal").css("display","none")}else{$("#modalerror").css("display","block");setTimeout(function(){$("#modalerror").css("display","none")},2000)}}})}function show_modal(){$(".modal").css("display","block")}function varqa_group_block(mygid,author){$.ajax({type:'POST',url:varqa_api_url+'group/block/',headers:{varqauser:myuser,varqapass:mypass},data:'{"group_id": '+mygid+'}',dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){$("#goptions").css("display","none");$(".container").html('<div class="messbox"><button onclick="varqa_group_unblock('+mygid+', '+author+')"  class="cbutton">Unblock</button></div>')}}})}function varqa_group_unblock(mygid,author){$.ajax({type:'POST',url:varqa_api_url+'group/unblock/',headers:{varqauser:myuser,varqapass:mypass},data:'{"group_id": '+mygid+'}',dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){this_type(mygid,false,author);wajx(false)}}})}function varqa_group_delete(mygid,author){$.ajax({type:'POST',url:varqa_api_url+'group/leave/',headers:{varqauser:myuser,varqapass:mypass},data:'{"group_id": '+mygid+'}',dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){$("#goptions").css("display","none");wajx(false)}}})}function sc(){localStorage.setItem("last_count",0);localStorage.setItem("last_mess",0);get_group_info();get_group_info(true);get_all_data();ajx(true);wajx(false);wajx();$('#mess').select()}function varqaclose(){localStorage.removeItem("varqauser");localStorage.removeItem("varqapass");window.location.replace(sessionStorage.getItem("varqaweburl"))}function get_baqi(){var this_scr=$(".data").scrollTop();var last_message=localStorage.getItem("last_mess");if(this_scr==0){get_all_data(last_message)}}function get_all_data(where=null){$.ajax({type:'GET',url:varqa_api_url+'get/data/',headers:{varqauser:myuser,varqapass:mypass},data:{group_id:dgid,from:where},success:function(data){var payams=JSON.parse(data);if(payams.ok==true){var this_last_count=localStorage.getItem("last_count");$.each(payams.results,function(i,val){var dates=val.date.split("|");if(val.author=='you'){var col='ma1';var mastl='margin-left: auto;';var reads=(val.not_reads_count==(localStorage.getItem("tak_member_count")-1)&&localStorage.getItem("tak_member_count")!=1)?'dat2':'dat1'}else{var col='ma2';var mastl=(val.author==null)?'margin-left: 0;':'margin-left: 4.5em;';var reads='dat1'}var readup=(reads=='dat1')?'*':'';var this_title=(val.author!=null&&val.author!='you')?'<div class="title"> '+val.author+'</div>':'<div></div>';var mycont=(val.content)?val.content:'';mycontent=mycont.replace(/(?:\r\n|\r|\n)/g,'<br>');if(mycontent.search("`")!=-1){function fupcon(item,index){if(index%2!=0){mycontent=mycontent.replace(item,"<code>"+item+"</code>")}}var upcon=mycontent.split("`");upcon.forEach(fupcon);mycontent=mycontent.replace(/`/g,"")}if(mycontent.search("http://")||mycontent.search("https://")){function urlify(text){var urlRegex=/(https?:\/\/[^\s]+)/g;return text.replace(urlRegex,function(url){return '<a class="datalinks" href="'+url+'" target="_blank">'+url+'</a>'})}mycontent=urlify(mycontent)}var myfile='';if(val.files){$.each(val.files,function(i2,val2){if(val2.type=='image/jpeg'||val2.type=='image/png'){myfile+='<a href="'+val2.file+'"><img class="fileimg" src="'+val2.file+'"></a><br>'}else if(val2.type=='audio/mpeg'){myfile+='<audio controls><source src="'+val2.file+'" type="audio/mpeg"></audio><br>'}})}var one_message='<div id="'+val.id+'" class="kol">'+this_title+'<div title="'+dates[1]+' '+dates[0]+'" style="'+mastl+'" class="'+col+'"><p class="asl">'+myfile+mycontent+'</p><p id="m'+val.id+'" class="'+reads+'">'+dates[2]+readup+'</p></div></div>';localStorage.setItem("last_mess",val.id);$("#matlab").prepend(one_message);count= ++this_last_count;localStorage.setItem("last_count",count)});if(where==null){scr()}else{new_scr(where)}}else{if(where==null){if(payams.results==null){$(".mainmenu").append('Permission denied')}else{$("#matlab").append('<p>Empty</p>')}}}}})}var oomad=document.createElement('audio');oomad.setAttribute('src','https://web.varqa.ir/when.mp3');var raft=document.createElement('audio');raft.setAttribute('src','https://web.varqa.ir/hollow.mp3');function ajx(first=false){$.ajax({type:'GET',url:varqa_api_url+'get/updates/',headers:{varqauser:myuser,varqapass:mypass},data:{group_id:dgid},dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){if(first==true){$("#matlab").append('<div id="jadid" class="jadid">New</div>')}$.each(data.results,function(i,val){if(val.author=='you'){raft.play()}else{oomad.play()}var dates=val.date.split("|");if(val.author=='you'){var col='ma1';var reads='dat2';var mastl='margin-left: auto;'}else{var col='ma2';var reads='dat1';var mastl=(val.author==null)?'margin-left: 0;':'margin-left: 4.5em;'}var readup=(reads=='dat1')?'*':'';var this_title=(val.author!=null&&val.author!='you')?'<div class="title"> '+val.author+'</div>':'<div></div>';var mycont=(val.content)?val.content:'';mycontent=mycont.replace(/(?:\r\n|\r|\n)/g,'<br>');if(mycontent.search("`")!=-1){function fupcon(item,index){if(index%2!=0){mycontent=mycontent.replace(item,"<code>"+item+"</code>")}}var upcon=mycontent.split("`");upcon.forEach(fupcon);mycontent=mycontent.replace(/`/g,"")}if(mycontent.search("http://")||mycontent.search("https://")){function urlify(text){var urlRegex=/(https?:\/\/[^\s]+)/g;return text.replace(urlRegex,function(url){return '<a class="datalinks" href="'+url+'" target="_blank">'+url+'</a>'})}mycontent=urlify(mycontent)}var myfile='';if(val.files){$.each(val.files,function(i2,val2){if(val2.type=='image/jpeg'||val2.type=='image/png'){myfile+='<a href="'+val2.file+'"><img class="fileimg" src="'+val2.file+'"></a><br>'}else if(val2.type=='audio/mpeg'){myfile+='<audio controls><source src="'+val2.file+'" type="audio/mpeg"></audio><br>'}})}var one_message='<div class="kol">'+this_title+'<div title="'+dates[1]+' '+dates[0]+'" style="'+mastl+'" class="'+col+'"><p class="asl">'+myfile+mycontent+'</p><p id="m'+val.id+'" class="'+reads+'">'+dates[2]+readup+'</p></div></div>';$(one_message).appendTo('#matlab').show('slow')});if(first==true){sscr()}else{scr()}}}})}function get_group_info(check=false){$.ajax({type:'GET',url:varqa_api_url+'get/groups/',headers:{varqauser:myuser,varqapass:mypass},data:{group_id:dgid,check:check},dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){if(check==false){var tak_g=data.results[0];$('#titre').html(tak_g.title);localStorage.setItem("tak_member_count",tak_g.member_count)}else{$("#membs").html("");$("#membs").append("Members:<br>");$.each(data.results[0],function(i,val){if(val.status=='online'){var status='<i style="color: teal;">Online</i>'}else{var d=new Date();var dates=val.status.split("|");var md=dates[1].split("/");var status='Last seen ';if(dates[0]==d.getFullYear()&&md[0]==(d.getMonth()+1)&&md[1]==d.getDate()){status+=dates[2]}else if(dates[0]==d.getFullYear()&&md[0]==(d.getMonth()+1)&&md[1]==(d.getDate()-1)){status+='Yesterday'}else if(dates[0]==d.getFullYear()&&md[0]==(d.getMonth()+1)){status+=(d.getDate()-md[1])+' Day(s) ago'}else if(dates[0]==d.getFullYear()){status+=((d.getMonth()+1)-md[0])+' Month(s) ago'}else{status+='Years ago'}}var mems='<p>'+val.name+'<i style="font-size: 80%">('+val.user+'):</i> '+status+'</p>';$("#membs").append(mems)})}}}});}function show_mems(){get_group_info(true);$("#memb").css("display","block")}function reads(){var mids=[];$(".dat2").each(function(){var sid=$(this).attr('id');mids.push(sid.replace("m",""))});var mymids=mids.join();if(mymids){$.ajax({type:'GET',url:varqa_api_url+'check/view/',headers:{varqauser:myuser,varqapass:mypass},data:{mid:mymids,gid:dgid},dataType:'json',contentType:'application/json',success:function(data){if(data.ok==true){$.each(data.results,function(i,val){if(val.view==true){thismidid=String("#m"+val.mid);if(thismidid!="#m"){$(thismidid).removeClass("dat2").addClass("dat1");$(thismidid).append("*")}}})}}})}}function scr(){var top=$("#matlab").height();$(".data").scrollTop(top)}function new_scr(where){var id="#"+parseInt(where);var top=$(id).offset().top;$(".data").scrollTop(top)}function sscr(){var top=$("#jadid").offset().top;$(".data").scrollTop(top)}
