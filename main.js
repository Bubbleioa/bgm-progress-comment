
function doIt() {
    if ($("a.p").length === 0) {
        setTimeout(doIt, 300)
        return
    }
    $("a.p").click(function () {
        doIt()
    })
    const list = $("span.info.clearit")
    for (let i = 0; i < list.length; i++) {
        if (list[i].innerHTML.includes("看过")) {
            const epUrl = $(list[i]).children("a.l")[1].href
            const author = $(list[i]).children("a.l")[0].href.split('https://bgm.tv/user/')[1]
            if (!epUrl.includes("subject/ep")) {
                continue
            }
            const epID = epUrl.split("subject/ep/")[1]
            const userID = $("#dock a")[0].href.split("https://bgm.tv/user/")[1]
            $.ajax({
                url: `https://api.bgm.tv/v0/episodes/${epID}`,
                method: 'GET',
                dataType: "json",
                success: function (epRes) {
                    $.ajax({
                        url: `https://api.bgm.tv/v0/users/${userID}/collections/${epRes['subject_id']}`,
                        method: 'GET',
                        dataType: "json",
                        success: function (mySubRes) {
                            if (epRes['ep'] > mySubRes['ep_status']) {
                                return
                            }
                            $.ajax({
                                url: epUrl,
                                method: 'GET',
                                dataType: "text",
                                success: function (epPageRes) {
                                    const comments = $(epPageRes).find(`div[data-item-user='${author}'].row_reply.clearit`)
                                    if (comments.length > 0) {
                                        const lastCommnetContent = $(comments[comments.length - 1]).find("div.message.clearit").text()
                                        $(list[i]).children("p.date").before($(`<div class="quote"><q>${lastCommnetContent}</q></div>`))
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    }
}

(function () {
    doIt()
})();
