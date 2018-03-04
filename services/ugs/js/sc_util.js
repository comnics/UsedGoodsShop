class SiteLOG {

    constructor(){
        $("body").append("<div id=\"consoleBox\" class=\"fixed-bottom\">[[Site Infomation]]</div>");

        this.logBox = $("#consoleBox");
    }

    print(msg){
        $(this.logBox).append(msg);
    }

    println(msg){
        var now = new Date();
        $(this.logBox).append("<br>");
        this.print("[" + now + "] " + msg);
        $(this.logBox).scrollTop(100000000);
    }

}
