# bgm-progress-comment
Bangumi 进度评论脚本，能够显示好友时间线中，对于单集的评论。评论会从 ep 评论里找到最后一条顶层评论。

只会对你看过的剧集进行展示，避免剧透。但是现在实现的方式是比较 api 返回的一个 ep 的数字，所以如果中间的格子没点，可能会出现意料之外的情况。