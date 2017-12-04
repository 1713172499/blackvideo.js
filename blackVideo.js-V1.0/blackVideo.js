// ***********************************************
//
// 名称: blackVideo.js
// 时间: 2017.11.26
// 作者: 何杜金 email: blackshare@163.com
// 描述: 针对视频（video）的一套封装方法
// 功能: 网页自定义控件功能（video）
// 版本号: V1.0
// 最后一次更新时间: 2017-12-4 19点43分
// 注意: 此脚本版权归作者所有,仅供个人学习所用.
//
// ***********************************************


/*
*   @param : video element
*   @param : the default blackVideo style is enabled
*/
// @Argument 1：传入video对象
// @Argument 2：传入要追加播放器的DOM元素
function videoStart(elem,appendToElem=document.body,videoWidth=false,videoHeight=false){
  var blackVideoFunc={};
  var blackVideoVar={};
  blackVideoFunc.videoTime=videoTime;                               //添加格式化所播放视频秒数的函数
  blackVideoFunc.videoControlAnimation=videoControlAnimation;       //添加鼠标放在播放器上,显示blackVideo.js的控制台函数
  blackVideoFunc.videoListenerFullScreen=videoListenerFullScreen;   //添加监听全屏状态显示浏览器默认控制台的函数
  blackVideoFunc.videoListenerVolumeIcon=videoListenerVolumeIcon;   //添加监听播放器音量大小并更改其对应对应图标的函数
  blackVideoFunc.videoSrc=videoSrc;                                 //返回视频src的函数
  blackVideoFunc.videoFileName=videoFileName;                       //返回视频的文件名的函数
  blackVideoFunc.videoCreateBox=videoCreateBox;                     //将video放入生成的播放控件里
  blackVideoFunc.getUserAgent=getUserAgent;                         //获取用户代理方式是mobile还是pc
  blackVideoFunc.selfAdaptation=selfAdaptation;                     //自适应播放器宽度显示控件
  blackVideoFunc.setCss=setCss;                                     //设置元素样式
  //初始化变量
  blackVideoVar.controlsStart=false;  //开启控制台的状态
  blackVideoVar.controlsShow=1; //移动端的控制台显示初始值
  blackVideoVar.isDownloadVideo=true;  //是否显示下载视频框
  blackVideoVar.videoHeader=null;//初始化播放器标题
  blackVideoVar.controlsStyleData={};//初始化控制台样式对象
  if (elem.tagName == "VIDEO") {
    console.info("blackVideo.js starting success!");
  }else{
    console.error("Arguments Error: There's no video element");
    return false;
  }



  // blackVideo的一些可选方法
  //set video player width
  this.setWidth=function(width){
    elem.style.width=width;
  }
  //set video player height
  this.setHeight=function(height){
    elem.style.height=height;
  }
  //video play
  this.videoPlay=function(){
    elem.play();
  }
  //video pause
  this.videoPause=function(){
    elem.pause();
  }

  //主要方法
  // 用户代理类型
  blackVideoVar.userAgentType = blackVideoFunc.getUserAgent();


  //构造函数中传入的video宽、高
  if (videoWidth!=false||videoHeight!=false) {
    elem.style.width=videoWidth;
    elem.style.height=videoHeight;
  }

  // @Arguments:控制台样式对象
  // @Param progressIng: 进度条已播放的背景色
  // @Param progressLoad: 进度条已缓冲的背景色
  // @Param progressBar: 进度条总长度的背景色
  // @Param progressBtn: 进度条按钮的背景色
  // @Param videoFiller: 视频补白背景色
  // @Param videoHeaderBGColor: 视频标题背景色
  // @Param videoHeaderFontColor: 视频标题字体色
  // @Param videoHeaderFontSize: 视频标题字体大小
  // @Param controlsBGColor: 控制台底部背景色
  // @Param volumeIng: 音量进度条背景色
  // @Param volumeBar: 音量总进度条背景色
  // @Param volumeBtn: 音量拖动按钮背景色
  // @Param playBtn: 播放按钮背景色
  // @Param currentColor: 当前播放时长背景色
  // @Param durationColor: 总播放时长背景色
  // @Param bisaColor: 播放时长与总时长中间的分割线
  // @Param hornColor: 喇叭按钮颜色
  // @Param downloadBGColor: 下载按钮框的颜色
  // @Param downloadBtnColor: 下载按钮的颜色
  // @Function：设置控制台样式
  this.controlsStyle=function(controlsStyleData={}){
    if(typeof controlsStyleData != 'object'){
      console.error("Arguments Error: artuments not Object.");
      return false;
    }else {
      if (!controlsStyleData.hasOwnProperty('progressIng')){
        controlsStyleData.progressIng="#33bab7";
      }
      if (!controlsStyleData.hasOwnProperty('progressLoad')){
        controlsStyleData.progressLoad="#444444";
      }
      if (!controlsStyleData.hasOwnProperty('progressBar')){
        controlsStyleData.progressBar="#666666";
      }
      if (!controlsStyleData.hasOwnProperty('progressBtn')){
        controlsStyleData.progressBtn="#fff";
      }
      if (!controlsStyleData.hasOwnProperty('videoFiller')) {
        controlsStyleData.videoFiller="#222222";
      }
      if (!controlsStyleData.hasOwnProperty('videoHeaderBGColor')) {
        controlsStyleData.videoHeaderBGColor="rgba(0,0,0,.8)";
      }
      if (!controlsStyleData.hasOwnProperty('videoHeaderFontColor')) {
        controlsStyleData.videoHeaderFontColor="#999";
      }
      if (!controlsStyleData.hasOwnProperty('videoHeaderFontSize')) {
        controlsStyleData.videoHeaderFontSize="14px";
      }
      if (!controlsStyleData.hasOwnProperty('controlsBGColor')) {
        controlsStyleData.controlsBGColor="rgba(0,0,0,.8)";
      }
      if (!controlsStyleData.hasOwnProperty('volumeIng')) {
        controlsStyleData.volumeIng="#ffffff";
      }
      if (!controlsStyleData.hasOwnProperty('volumeBar')) {
        controlsStyleData.volumeBar="#333";
      }
      if (!controlsStyleData.hasOwnProperty('volumeIng')) {
        controlsStyleData.volumeIng="#ffffff";
      }
      if (!controlsStyleData.hasOwnProperty('playBtn')) {
        controlsStyleData.playBtn="#fff";
      }
      if (!controlsStyleData.hasOwnProperty('currentColor')) {
        controlsStyleData.currentColor="#fff";
      }
      if (!controlsStyleData.hasOwnProperty('durationColor')) {
        controlsStyleData.durationColor="#777";
      }
      if (!controlsStyleData.hasOwnProperty('bisaColor')) {
        controlsStyleData.bisa="#777";
      }
      if (!controlsStyleData.hasOwnProperty('hornColor')) {
        controlsStyleData.hornColor="#fff";
      }
      if (!controlsStyleData.hasOwnProperty('fullscreenColor')) {
        controlsStyleData.fullscreenColor="#fff";
      }
      if (!controlsStyleData.hasOwnProperty('downloadBGColor')) {
        controlsStyleData.downloadBGColor="rgba(0,0,0,.8)";
      }
      if (!controlsStyleData.hasOwnProperty('downloadBtnColor')) {
        controlsStyleData.downloadBtnColor="#fff";
      }
      blackVideoVar.controlsStyleData=controlsStyleData;
    }
  }


  //启用控制台
  this.controlsStart=function(isDownloadVideo=true,videoHeader=blackVideoFunc.videoFileName()){
    //是否显示下载按钮
    if (typeof isDownloadVideo != "boolean") {
      blackVideoVar.isDownloadVideo=true;
    }else{
      blackVideoVar.isDownloadVideo=isDownloadVideo;
    }
    //定义初始化播放器标题
    blackVideoVar.videoHeader=videoHeader;
    //将video放入blackVideo.js生成的控件里
    blackVideoFunc.videoCreateBox(appendToElem);
    //适配播放器自适应宽度显示控件
    blackVideoFunc.selfAdaptation();
    //控制台显示状态
    blackVideoVar.controlsStart=true;
    //播放器控制台的显示动画事件
    blackVideoFunc.videoControlAnimation();

    //当浏览器开始查找视频时，及当加载过程开始时
    elem.onloadstart = function(){
      //console.log("视频已开始加载"+"readyState:"+elem.readyState);
    }
    //当视频加载后，时长由NaN变为视频的实际时长时，开始事件
    elem.ondurationchange = function(){
      //console.log("视频时长已从NaN变成实际时长"+"readyState:"+elem.readyState);
      var duration=parseInt(elem.duration);
      var videoDuration=blackVideoFunc.videoTime(duration);
      elem.parentNode.children[2].children[2].children[2].innerHTML=videoDuration;
    }
    // 当视频的元数据已加载时，会发生此事件，元数据包括：时长、尺寸（仅视频）以及文本轨道
    elem.onloadedmetadata = function(){
      //console.log("视频元数据已加载"+"readyState:"+elem.readyState);
    }
    // 当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生 loadeddata 事件
    elem.onloadeddata = function(){
      //console.log("当前帧数据已加载，但没有足够的数据来播放视频的下一帧"+"readyState:"+elem.readyState);
    }
    // 当浏览器正在下载指定视频时，发生progress事件
    elem.onprogress = function(){
      //console.log("浏览器正在下载指定视频"+"readyState:"+elem.readyState)
    }
    //当视频资源可以播放时
    elem.oncanplay = function(){
      //console.log("视频资源已经足够播放"+"readyState:"+elem.readyState);
    }
    // 当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时，会发生 canplaythrough 事件。
    elem.oncanplaythrough = function(){
      //console.log("浏览器预计能在不停下来缓存的情况下，持续播放指定视频"+"readyState:"+elem.readyState);
    }

    // @Param 1：currentTime 视频已播放秒数
    // @Param 2: videoCurrentTime 视频已播放秒数被格式化成 00:00
    // @Param 3: duration 视频总时长秒数
    // @Param 4：videoDuration 视频总时长秒数格式化成 00：00
    // @Param 5：pre 比值
    // @Param 6：bufferedStart 缓冲开始的秒数
    // @Param 7: bufferedEnd 正缓冲到的秒数
    // @Param 8: load 已缓冲的百分比值
    // @Formula：已播放时长 / 总时长 * 100 =已播放的百分比
    // @Formula: 正缓冲到秒数 - 缓冲开始的秒数 / 视频总时长 * 100 =已缓冲百分比
    // @Function：改变播放时长更新时，更新视频UI进度
    // @Event：视频播放时长发生改变时自动调用函数
    elem.ontimeupdate=function(){
      //更新播放已播放时长和总时长
      var currentTime=parseInt(elem.currentTime);
      var videoCurrentTime=blackVideoFunc.videoTime(currentTime);
      elem.parentNode.children[2].children[2].children[0].innerHTML=videoCurrentTime;
      var duration=parseInt(elem.duration);
      var videoDuration=blackVideoFunc.videoTime(duration);
      elem.parentNode.children[2].children[2].children[2].innerHTML=videoDuration;

      //更新播放器进度
      var pre=elem.currentTime / elem.duration * 100;
      elem.parentNode.children[2].children[1].children[0].children[1].style.width=pre+"%";
      elem.parentNode.children[2].children[1].children[0].children[3].style.left=pre+"%";

      //更新已经加载好的视频进度
      if(elem.buffered.length>0){
        var bufferedStart = elem.buffered.start(0);
        var bufferedEnd = elem.buffered.end(0);
        var load = ((bufferedEnd - bufferedStart) / elem.duration) *100
        elem.parentNode.children[2].children[1].children[0].children[2].style.width = load + "%";
      }

      //更新按钮显示图标
      if (elem.paused) {
        var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-pause)/,"icon-play");
        elem.parentNode.children[2].children[0].className=vClass;
      }else{
        var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-play)/,"icon-pause");
        elem.parentNode.children[2].children[0].className=vClass;
      };

      if (!elem.paused) {
        elem.parentNode.children[3].style.display="none";
      }
    }


    // @Event: 当播放器视频播放至结尾时
    elem.onended=function(){
      elem.parentNode.children[3].style.display="flex";
      elem.parentNode.children[2].children[0].className=elem.parentNode.children[2].children[0].className.replace(/(icon-pause)/,"icon-play");
      elem.parentNode.children[3].children[0].addEventListener("click",function(){
        elem.play();
        elem.parentNode.children[3].style.display="none";
      })
    }



    //播放按钮被点击
    elem.parentNode.children[2].children[0].addEventListener("click",function(){
      if (elem.paused) {
        var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-play)/,"icon-pause");
        elem.parentNode.children[2].children[0].className=vClass;
        elem.play();
        //console.log(elem.paused);
      }else{
        var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-pause)/,"icon-play");
        elem.parentNode.children[2].children[0].className=vClass;
        elem.pause();
        //console.log(elem.paused);
      };
    })
    // PC端：播放器被点击，视频暂停
    if (blackVideoVar.userAgentType == "pc") {
      elem.addEventListener("click",function(){
        if (elem.paused) {
          var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-play)/,"icon-pause");
          elem.parentNode.children[2].children[0].className=vClass;
          elem.play();
        }else{
          var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-pause)/,"icon-play");
          elem.parentNode.children[2].children[0].className=vClass;
          elem.pause();
        };
      })
    }


    //跳转视频进度（点击进度条方式）
    elem.parentNode.children[2].children[1].children[0].children[0].addEventListener("click",function(e){
      var event = e || window.event;
      elem.currentTime=( event.offsetX / this.offsetWidth ) * elem.duration;
      //改变按钮图标
      // var vClass=elem.parentNode.children[2].children[0].className.replace(/(icon-play)/,"icon-pause");
      // elem.parentNode.children[2].children[0].className=vClass;
    })

    //跳转视频进度（拖动滑块按钮方式）
    elem.parentNode.children[2].children[1].children[0].children[3].addEventListener("mousedown",function(e){
      var event = e || window.event;
      var x = event.clientX;
      var l = elem.parentNode.children[2].children[1].children[0].children[3].offsetLeft;
      var max = elem.parentNode.children[2].children[1].children[0].children[4].offsetWidth - elem.parentNode.children[2].children[1].children[0].children[3].offsetWidth;

      document.body.onmousemove=function(e){
        var event = e || window.event;
        var ox = event.pageX;
        var vx=elem.parentNode.children[2].children[1].parentNode.parentNode.offsetLeft;
        var bx=elem.parentNode.children[2].children[1].offsetLeft;
        //更新视频进度
        elem.currentTime=((ox-vx-bx)/elem.parentNode.children[2].children[1].children[0].children[4].offsetWidth) * elem.duration;

        //更新已播放片段和按钮位置
        var progressLong = Math.max(0,(elem.currentTime / elem.duration) * 100);
        elem.parentNode.children[2].children[1].children[0].children[1].style.width = progressLong + "%";
        elem.parentNode.children[2].children[1].children[0].children[3].style.left = progressLong + "%";
      }
      document.body.onmouseup=function(){
        document.body.onmousemove=new Function("this.onmousemove=null");
      }
    })
    // @Param 1：blackVideoVar.videoValume 记录静音前的音量
    // @Function：点击切换静音与有声
    // @Event：音量按钮被点击
    elem.parentNode.children[2].children[3].children[0].addEventListener("click",function(){
      if (elem.volume != 0) {
        blackVideoVar.videoValume=elem.volume;
        //console.log(blackVideoVar.videoValume);
        elem.volume = 0;
        elem.parentNode.children[2].children[3].children[1].children[0].children[1].style.width = 0 + "%";
        elem.parentNode.children[2].children[3].children[1].children[0].children[2].style.left = 0 + "%";
      }else{
        elem.volume = blackVideoVar.videoValume;
        //console.log(blackVideoVar.videoValume);
        elem.parentNode.children[2].children[3].children[1].children[0].children[1].style.width = blackVideoVar.videoValume * 100 + "%";
        elem.parentNode.children[2].children[3].children[1].children[0].children[2].style.left = blackVideoVar.videoValume * 100 + "%";
      }
      //监听音量图标
      blackVideoFunc.videoListenerVolumeIcon();
    })
    // @Param 1：voideoVolume 视频当前音量
    // @Param 2：x 当前鼠标距离元素左边的距离
    // @Param 3：thisWidth 当前元素的宽度
    // @Function：点击音量进度条根据 鼠标点击位置 / 元素总宽度 =一个比值 就是音量大小
    // @Event：音量进度条被点击
    elem.parentNode.children[2].children[3].children[1].children[0].children[0].addEventListener("click",function(e){
      var event = e || window.event;
      var videoVolume = elem.volume;
      var x = event.offsetX;
      var thisWidth = this.offsetWidth;

      elem.volume = x / thisWidth;
      blackVideoFunc.videoListenerVolumeIcon(); //判断音量大小，显示对应音量图标

      elem.parentNode.children[2].children[3].children[1].children[0].children[1].style.width = ((x / thisWidth) * 100) + "%";
      elem.parentNode.children[2].children[3].children[1].children[0].children[2].style.left = ((x / thisWidth) * 100) + "%";
    });
    // @Param 1：mx 当前鼠标距离文档X轴的距离
    // @Param 2：dx 音量进度条距离祖先元素的左边距
    // @Param 3：vx 音量进度条其祖先元素距离文档的左边距
    // @Param 4：bx 音量进度条的总宽度
    // @Formula：(mx-vx-dx) / bx 算出音量比值
    // @Function：拖动滑块改变播放器音量
    // @Event：滑块被点击并且鼠标移动，松开鼠标清除鼠标移动事件
    elem.parentNode.children[2].children[3].children[1].children[0].children[2].addEventListener("mousedown",function(e){
      document.body.onmousemove=function(e){
        var event = e || window.event;
        var mx = event.pageX;
        var bx = elem.parentNode.children[2].children[3].children[1].offsetWidth;
        var dx = elem.parentNode.children[2].children[3].children[1].offsetLeft;
        var vx = elem.parentNode.children[2].children[3].children[1].parentNode.parentNode.parentNode.offsetLeft;

        elem.volume = Math.min(Math.max(0,( mx - vx - dx ) / bx),1);
        blackVideoFunc.videoListenerVolumeIcon(); //判断音量大小，显示对应音量图标
        var volumeWidth = Math.min(Math.max(0,(( mx - vx - dx ) / bx * 100)),100);
        elem.parentNode.children[2].children[3].children[1].children[0].children[1].style.width = volumeWidth + "%";
        elem.parentNode.children[2].children[3].children[1].children[0].children[2].style.left = volumeWidth + "%";
      }
      document.body.onmouseup=function(e){
        document.body.onmousemove=new Function("this.onmousemove=null");
      }
    });

    // @Function：点击全屏按钮，使当前播放器全屏显示
    // @Event：全屏按钮被点击
    elem.parentNode.children[2].children[4].addEventListener("click",function(){

      if (elem.webkitRequestFullScreen) {//谷歌等
        elem.webkitRequestFullScreen()
      }else if(elem.requestFullScreen){//W3C
        elem.requestFullScreen();
      }else if (elem.mozRequestFullScreen) {//火狐
        elem.mozRequestFullScreen();
      }else if (elem.msRequestFullScreen) {//IE11
        elem.msRequestFullScreen();
      }

    })

    // 启用函数，监听全屏状态下显示默认控制台
    blackVideoFunc.videoListenerFullScreen();
  }


  // @Param 1: time 传入的秒数
  // @Param 2: m 分钟
  // @Param 3: s 秒数
  // @Function: 返回视频的时间,格式：00:00
  // @Return: m+':'+s
  function videoTime(time){
    var time=time;
    var m=parseInt(time/60),
    s=parseInt(time%60);
    m=m<10 ? "0"+m : m;
    s=s<10 ? "0"+s : s;
    return m+":"+s;
  }

  // @Function: 鼠标移动播放器显示控制台,移出隐藏播放器控制台
  // @Event: 鼠标经过播放器,鼠标移出播放器
  function  videoControlAnimation(){
    if (blackVideoVar.userAgentType == "pc") {
      elem.parentNode.onmouseover=function(){
        elem.parentNode.children[0].style.top="0";
        elem.parentNode.children[2].style.bottom="0";
        if (blackVideoVar.isDownloadVideo) {
          elem.parentNode.children[4].style.right="0";
        }
      }
      elem.parentNode.onmouseout=function(){
        elem.parentNode.children[0].style.top="-3em";
        elem.parentNode.children[2].style.bottom="-4em";
        if (blackVideoVar.isDownloadVideo) {
          elem.parentNode.children[4].style.right="-2em";
        }
      }
    }else if (blackVideoVar.userAgentType == "mobile") {
      elem.addEventListener("touchend",function(){
        if (blackVideoVar.controlsShow % 2 == 1) {
          elem.parentNode.children[0].style.top="0";
          elem.parentNode.children[2].style.bottom="0";
          if (blackVideoVar.isDownloadVideo) {
            elem.parentNode.children[4].style.right="0";
          }
          blackVideoVar.controlsShow++;
        }else if (blackVideoVar.controlsShow % 2 == 0) {
          elem.parentNode.children[0].style.top="-3em";
          elem.parentNode.children[2].style.bottom="-4em";
          if (blackVideoVar.isDownloadVideo) {
            elem.parentNode.children[4].style.right="-2em";
          }
          blackVideoVar.controlsShow++;
        }
      })
    }

  }

  // @Function: 监听全屏状态,全屏状态下:显示浏览器自带控制台;非全屏状态:显示blackVideo.js的默认控制台
  // @Param 1: document.mozFullScreen 返回当前火狐内核时是否为全屏状态 true false
  // @Event 1: mozfullscreenchange 监听火狐内核下全屏视频变化
  // @Param 2: document.fullscreen 返回当前W3C标准时是否为全屏状态 true false
  // @Event 2: fullscreenchange 监听W3C内核下全屏视频变化
  // @Param 3: document.webkitIsFullScreen 返回当前webkit内核时是否为全屏状态 true false
  // @Event 3: webkitfullscreenchange 监听webkit内核下全屏视频变化
  // @Param 4: document.msFullScreenElement 返回当前IE11是否为全屏状态 true false
  // @Event 4: msfullscreenchange 监听IE11下全屏视频变化
  function videoListenerFullScreen(){
    // 火狐
    document.addEventListener("mozfullscreenchange",function(){
        if(document.mozFullScreen){
          elem.setAttribute("controls",true);
        }else{
          elem.removeAttribute("controls");
        }
    });
    // W3C
    document.addEventListener("fullscreenchange",function(){
      if (document.fullscreen) {
        elem.setAttribute("controls",true);
      }else {
        elem.removeAttribute("controls");
      }
    });
    //谷歌
    document.addEventListener("webkitfullscreenchange",function(){
      if (document.webkitIsFullScreen) {
        elem.setAttribute("controls",true);
      }else {
        elem.removeAttribute("controls");
      }
    });
    //IE11
    document.addEventListener("msfullscreenchange",function(){
      if (document.msFullScreenElement) {
        elem.setAttribute("controls",true);
      }else {
        elem.removeAttribute("controls");
      }
    });
  }

  // @Function: 判断音量大小，显示对应音量图标
  function videoListenerVolumeIcon(){
    if (elem.volume == 0){
      //console.log("off");
      elem.parentNode.children[2].children[3].children[0].className=elem.parentNode.children[2].children[3].children[0].className.replace(/^icon-volume-(down|up)/,"icon-volume-off");
    }else if (elem.volume < 0.6 && elem.volume > 0) {
      //console.log("down");
      elem.parentNode.children[2].children[3].children[0].className=elem.parentNode.children[2].children[3].children[0].className.replace(/^icon-volume-(off|up)/,"icon-volume-down");
    }else if(elem.volume >= 0.6){
      //console.log("up");
      elem.parentNode.children[2].children[3].children[0].className=elem.parentNode.children[2].children[3].children[0].className.replace(/^icon-volume-(off|down)/,"icon-volume-up");
    }
  }

  // @Function：返回视频src路径
  function videoSrc(){
    var downloadURL = elem.src;
    return downloadURL
  }

  // @Function：返回当前播放视频的文件名
  function videoFileName(){
    var videoPath = elem.src;
    var fileName = videoPath.substring(videoPath.lastIndexOf("/")+1,videoPath.length);
    return fileName;
  }

  // @Argument 1： 要追加播放器的DOM元素
  // @Function：生成播放器外层与播放器控件
  function videoCreateBox(appendToElem){
    //外层div
    var blackVideoDiv = document.createElement("div");
    blackVideoDiv.setAttribute("class","blackVideo");
    //播放器标题
    var videoHeaderDiv = document.createElement("div");
    videoHeaderDiv.style.backgroundColor=blackVideoVar.controlsStyleData.videoHeader;
    videoHeaderDiv.style.fontSize=blackVideoVar.controlsStyleData.videoHeaderFontSize;
    videoHeaderDiv.style.color=blackVideoVar.controlsStyleData.videoHeaderFontColor;
    videoHeaderDiv.setAttribute("class","video-header");
    videoHeaderDiv.appendChild(document.createTextNode(blackVideoVar.videoHeader));

    //播放器控制台
    var controlsBoxDiv = document.createElement("div");
    controlsBoxDiv.style.backgroundColor=blackVideoVar.controlsStyleData.controlsBGColor;
    controlsBoxDiv.setAttribute("class","controls-box");
      // 播放/暂停按钮
      var playBtnSpan = document.createElement("span");
      playBtnSpan.style.color=blackVideoVar.controlsStyleData.playBtn;
      playBtnSpan.setAttribute("class","icon-play play-btn");
      playBtnSpan.setAttribute("title","播放/暂停");
      // 播放进度条
      var progressBoxSpan = document.createElement("span");
      progressBoxSpan.setAttribute("class","progress-box");
      var progressTSpan = document.createElement("span");
      progressTSpan.setAttribute("class","progress-t");
      var progressDownEm = document.createElement("em");
      progressDownEm.setAttribute("class","progress-down");
      var progressIngEm = document.createElement("em");
      progressIngEm.style.backgroundColor=blackVideoVar.controlsStyleData.progressIng;
      progressIngEm.setAttribute("class","progress-ing");
      var progressLoadEm = document.createElement("em");
      progressLoadEm.style.backgroundColor=blackVideoVar.controlsStyleData.progressLoad;
      progressLoadEm.setAttribute("class","progress-load");
      var progressBtnEm = document.createElement("em");
      progressBtnEm.style.backgroundColor=blackVideoVar.controlsStyleData.progressBtn;
      progressBtnEm.setAttribute("class","progress-btn");
      var progressBarEm = document.createElement("em");
      progressBarEm.style.backgroundColor=blackVideoVar.controlsStyleData.progressBar;
      progressBarEm.setAttribute("class","progress-bar");

      progressTSpan.appendChild(progressDownEm);
      progressTSpan.appendChild(progressIngEm);
      progressTSpan.appendChild(progressLoadEm);
      progressTSpan.appendChild(progressBtnEm);
      progressTSpan.appendChild(progressBarEm);

      progressBoxSpan.appendChild(progressTSpan);

      //视频时长信息
      var videoTimeSpan = document.createElement("span");
      videoTimeSpan.setAttribute("class","video-time");
      var videoCurrentSpan = document.createElement("span");
      videoCurrentSpan.style.color=blackVideoVar.controlsStyleData.currentColor;
      videoCurrentSpan.innerHTML=blackVideoFunc.videoTime(elem.currentTime);//初始化播放器当前播放时长
      videoCurrentSpan.setAttribute("class","current");
      var videoC_D=document.createElement("em");
      videoC_D.style.color=blackVideoVar.controlsStyleData.bisaColor;
      videoC_D.appendChild(document.createTextNode("/"));
      var videoTotalSpan = document.createElement("span");
      videoTotalSpan.style.color=blackVideoVar.controlsStyleData.durationColor;
      videoTotalSpan.innerHTML=blackVideoFunc.videoTime(elem.duration);//初始化播放器总时长
      videoTotalSpan.setAttribute("class","total");

      videoTimeSpan.appendChild(videoCurrentSpan);
      videoTimeSpan.appendChild(videoC_D);
      videoTimeSpan.appendChild(videoTotalSpan);

      // 音量按钮控件
      var volumeBoxSpan = document.createElement("span");
      volumeBoxSpan.setAttribute("class","volume-box");
      var volumeBtnSpan = document.createElement("span");
      volumeBtnSpan.style.color=blackVideoVar.controlsStyleData.hornColor;
      volumeBtnSpan.setAttribute("class","icon-volume-up volume-btn");

      var volumeTSpan = document.createElement("span");
      volumeTSpan.setAttribute("class","volume-t");
      var volumeBarSpan = document.createElement("span");
      volumeBarSpan.style.backgroundColor=blackVideoVar.controlsStyleData.volumeBar;
      volumeBarSpan.setAttribute("class","volume-bar");
      var volumeDownEm = document.createElement("em");
      volumeDownEm.setAttribute("class","volume-down");
      var volumeIngEm = document.createElement("em");
      volumeIngEm.style.backgroundColor=blackVideoVar.controlsStyleData.volumeIng;
      volumeIngEm.setAttribute("class","volume-ing");
      var volumeTBtnEm = document.createElement("em");
      volumeTBtnEm.style.backgroundColor=blackVideoVar.controlsStyleData.volumeBtn;
      volumeTBtnEm.setAttribute("class","volume-t-btn");
      volumeBarSpan.appendChild(volumeDownEm);
      volumeBarSpan.appendChild(volumeIngEm);
      volumeBarSpan.appendChild(volumeTBtnEm);
      volumeTSpan.appendChild(volumeBarSpan);
      volumeBoxSpan.appendChild(volumeBtnSpan);
      volumeBoxSpan.appendChild(volumeTSpan);

      // 全屏按钮
      var fullscreenSpan = document.createElement("span");
      fullscreenSpan.style.color=blackVideoVar.controlsStyleData.fullscreenColor;
      fullscreenSpan.setAttribute("class","icon-resize-full-alt fullscreen");
      fullscreenSpan.setAttribute("title","全屏显示");

    controlsBoxDiv.appendChild(playBtnSpan);
    controlsBoxDiv.appendChild(progressBoxSpan);
    controlsBoxDiv.appendChild(videoTimeSpan);
    controlsBoxDiv.appendChild(volumeBoxSpan);
    controlsBoxDiv.appendChild(fullscreenSpan);


    //再次播放div
    var videoOverLarySpan = document.createElement("span");
    videoOverLarySpan.setAttribute("class","video-overlary");
    var iconCwSpan = document.createElement("span");
    iconCwSpan.setAttribute("class","icon-cw");
    iconCwSpan.setAttribute("title","再次播放");
    videoOverLarySpan.appendChild(iconCwSpan);

    //下载控件
    if(blackVideoVar.isDownloadVideo){
      var videoDownloadA = document.createElement("a");
      videoDownloadA.style.backgroundColor=blackVideoVar.controlsStyleData.downloadBGColor;
      videoDownloadA.setAttribute("class","video-download");
      videoDownloadA.setAttribute("href",blackVideoFunc.videoSrc());
      videoDownloadA.setAttribute("download",blackVideoFunc.videoFileName());
      videoDownloadA.setAttribute("title","下载视频");
      videoDownloadA.setAttribute("target","_blank");
      var iconDownloadSpan = document.createElement("span");
      iconDownloadSpan.style.color=blackVideoVar.controlsStyleData.downloadBtnColor;
      iconDownloadSpan.setAttribute("class","icon-download");
      videoDownloadA.appendChild(iconDownloadSpan);
    }


    blackVideoDiv.appendChild(videoHeaderDiv);
    elem.style.backgroundColor=blackVideoVar.controlsStyleData.videoFiller;
    blackVideoDiv.appendChild(elem);
    blackVideoDiv.appendChild(controlsBoxDiv);
    blackVideoDiv.appendChild(videoOverLarySpan);
    if (blackVideoVar.isDownloadVideo) {
      blackVideoDiv.appendChild(videoDownloadA);
    }
    appendToElem.appendChild(blackVideoDiv);
  }

  // @Function： 获取用户代理是mobile还是pc
  // @return String：agentType
  function getUserAgent(){
    var userAgent=window.navigator.userAgent;
    var agentType;
    if (userAgent.indexOf("iPod")!=-1 || userAgent.indexOf("iPad")!=-1 || userAgent.indexOf("iPhone")!=-1 || userAgent.indexOf("Android")!=-1) {
      agentType="mobile";
      return agentType;
    }else{
      agentType="pc";
      return agentType;
    }
  };

  // @Function： 自适应播放器宽度显示控件
  function selfAdaptation(){
    if (elem.clientWidth<78) {
      //只有播放/暂停按钮
      elem.parentNode.children[2].children[1].style.display="none";
      //音量条消失
      elem.parentNode.children[2].children[3].style.display="none";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].style.display="none";
      //全屏按钮
      elem.parentNode.children[2].children[4].style.width="30px";
      //全屏按钮
      elem.parentNode.children[2].children[4].style.display="none";

    }else if (elem.clientWidth>=80 && elem.clientWidth<=110) {
      //只有播放/暂停按钮 和 音量按钮
      elem.parentNode.children[2].children[1].style.display="none";
      // 播放按钮
      elem.parentNode.children[2].children[0].style.marginRight="12%";
      //音量条消失
      elem.parentNode.children[2].children[3].children[1].style.display="none";
      elem.parentNode.children[2].children[3].style.width="30px";
      elem.parentNode.children[2].children[3].children[0].style.width="100%";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].style.display="none";
      //全屏按钮
      elem.parentNode.children[2].children[4].style.display="none";

    }else if (elem.clientWidth>110 && elem.clientWidth<150) {
      //只有播放/暂停按钮 和 音量按钮 和全屏按钮
      elem.parentNode.children[2].children[1].style.display="none";
      // 播放按钮
      elem.parentNode.children[2].children[0].style.marginRight="14%";
      //音量条消失
      elem.parentNode.children[2].children[3].children[1].style.display="none";
      elem.parentNode.children[2].children[3].style.width="30px";
      elem.parentNode.children[2].children[3].children[0].style.width="100%";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].style.display="none";
      //全屏按钮
      elem.parentNode.children[2].children[4].style.width="30px";

    }else if (elem.clientWidth>=150 && elem.clientWidth<200) {
      //只有播放/暂停按钮 和当前播放时长 和 音量按钮 和全屏按钮
      elem.parentNode.children[2].children[1].style.display="none";
      //音量条消失
      elem.parentNode.children[2].children[3].children[1].style.display="none";
      elem.parentNode.children[2].children[3].style.width="auto";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].children[1].style.display="none";
      elem.parentNode.children[2].children[2].children[2].style.display="none";
      elem.parentNode.children[2].children[2].style.width="50%";
      elem.parentNode.children[2].children[2].children[0].style.width="100%";
      elem.parentNode.children[2].children[2].children[0].style.margin="0 auto";
      elem.parentNode.children[2].children[2].children[0].style.textAlign="left";
    }else if (elem.clientWidth>=200 && elem.clientWidth<250) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="35px";
      //音量条消失
      elem.parentNode.children[2].children[3].children[1].style.display="none";
      elem.parentNode.children[2].children[3].style.width="auto";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].children[0].style.width="100%";
      elem.parentNode.children[2].children[2].children[1].style.display="none";
      elem.parentNode.children[2].children[2].children[2].style.display="none";
      elem.parentNode.children[2].children[2].style.width="38px";
      // 音量按钮为百分比
      elem.parentNode.children[2].children[3].children[0].style.width="100%";
      //全屏按钮宽度变小
      elem.parentNode.children[2].children[4].style.width="30px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="30%";
    }else if (elem.clientWidth>=250 && elem.clientWidth<300) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="40px";
      //音量条消失
      elem.parentNode.children[2].children[3].children[1].style.display="none";
      elem.parentNode.children[2].children[3].style.width="auto";
      //播放器总时长消失
      elem.parentNode.children[2].children[2].children[0].style.width="100%";
      elem.parentNode.children[2].children[2].children[1].style.display="none";
      elem.parentNode.children[2].children[2].children[2].style.display="none";
      elem.parentNode.children[2].children[2].style.width="38px";
      // 音量按钮为百分比
      elem.parentNode.children[2].children[3].children[0].style.width="100%";
      //全屏按钮宽度变小
      elem.parentNode.children[2].children[4].style.width="30px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="47%";
    }else if (elem.clientWidth>=300 && elem.clientWidth<350) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="30px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="18%";
      // 音量盒子变短
      elem.parentNode.children[2].children[3].style.width="90px";
      // 播放时长盒子变短
      elem.parentNode.children[2].children[2].style.width="80px";
      //全屏按钮宽度变小
      elem.parentNode.children[2].children[4].style.width="30px";
    }else if (elem.clientWidth>=350 && elem.clientWidth<400) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="30px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="32%";
      // 音量盒子变短
      elem.parentNode.children[2].children[3].style.width="90px";
      // 播放时长盒子变短
      elem.parentNode.children[2].children[2].style.width="80px";
      //全屏按钮宽度变小
      elem.parentNode.children[2].children[4].style.width="30px";
    }else if (elem.clientWidth>=400 && elem.clientWidth<450) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="32%";
    }else if (elem.clientWidth>=450 && elem.clientWidth<500) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="35px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="38%";
    }else if (elem.clientWidth>=500 && elem.clientWidth<550) {
      //播放按钮变小
      elem.parentNode.children[2].children[0].style.width="45px";
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="42%";
    }else if (elem.clientWidth>=550 && elem.clientWidth<600) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="46%";
    }else if (elem.clientWidth>=600 && elem.clientWidth<650) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="50%";
    }else if (elem.clientWidth>=650 && elem.clientWidth<700) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="55%";
    }else if (elem.clientWidth>=700 && elem.clientWidth<750) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="58%";
    }else if (elem.clientWidth>=750 && elem.clientWidth<800) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="60%";
    }else if (elem.clientWidth>=800 && elem.clientWidth<850) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="63%";
    }else if (elem.clientWidth>=850 && elem.clientWidth<900) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="65%";
    }else if (elem.clientWidth>=900 && elem.clientWidth<1000) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="67%";
    }else if (elem.clientWidth>=1000 && elem.clientWidth<1050) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="70%";
    }else if (elem.clientWidth>=1050 && elem.clientWidth<1100) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="70%";
    }else if (elem.clientWidth>=1100 && elem.clientWidth<1700) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="77%";
      elem.parentNode.children[2].children[2].style.width="10%";
    }else if (elem.clientWidth>=1700 && elem.clientWidth<2000) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="85%";
      elem.parentNode.children[2].children[2].style.width="8%";
    }else if (elem.clientWidth>=2000 && elem.clientWidth<2300) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="90%";
      elem.parentNode.children[2].children[2].style.width="6%";
    }else if (elem.clientWidth>=2300 && elem.clientWidth<3500) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="95%";
      elem.parentNode.children[2].children[2].style.width="5%";
    }else if (elem.clientWidth>=3500) {
      // 进度条变短
      elem.parentNode.children[2].children[1].style.width="96%";
      elem.parentNode.children[2].children[2].style.width="3%";
    }
  }

  // @Param 1: elem Dom元素
  // @Param 2: data 对象
  // @Function：设置元素的样式
  function setCss(elem,data={}){
    if (typeof elem != "object") {
      console.error("Function setCss have Error: param 1 not an Element");
      return false;
    }
    if (typeof data != "object") {
      console.error("Function setCss have Error: param 2 not an object");
      return false;
    }
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        elem.style[k]=data[k];
      }
    }
  }

}
