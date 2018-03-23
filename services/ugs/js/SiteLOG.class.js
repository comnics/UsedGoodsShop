class SiteLOG {

    constructor(){
        $("body").append("<div id=\"consoleBox\" class=\"fixed-bottom\"><span class=\"btn-close-console\">X</span><div id=\"consoleBoard\">[[Site Infomation]]</div></div>");

        this.logBox = $("#consoleBox");
        this.logBoard = $("#consoleBoard");

        $(".btn-close-console").click(function(){
            $("#consoleBox").hide();
        });

    }

    hide(){
        $(this.logBox).hide();
    }

    print(msg){
        $(this.logBoard).append(msg);
    }

    println(msg){
        var now = new Date();
        $(this.logBoard).append("<br>");
        this.print("[" + now + "] " + msg);
        $(this.logBoard).scrollTop(100000000);
    }

}
