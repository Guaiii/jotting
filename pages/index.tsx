import Markdown from "@/components/Markdown/Markdown";
import {memo} from "react";

const str: string = `
     
总会有闲的蛋疼的时候，在这些日子里面，有颓废，有空虚，有无趣。${'`总不能一直散发恶臭`'}，
需要谋计一些事情坚定下去，现在就把那些点滴记录整理。
希望伙计们不需要被生活的情绪给影响，[历史不会留名于你，放心去做]()。
临暮，许有万般不舍无奈都将释怀。

> 太虚幻境，名字来源，贾宝玉在进入太虚幻境的时候看见未来。

《红楼梦》告诉你，一切都是虚妄，大起大落只在一瞬间。珍惜现在，回过头只剩下无尽的悲痛。

 \`\`\`js
    无故寻愁觅恨，有时似傻如狂。
    纵然生得好皮囊，腹内原来草莽。
    潦倒不通世务，愚顽怕读文章。
    行为偏僻性乖张，那管世人诽谤。

    富贵不知乐业，贫穷难耐凄凉。
    可怜辜负好韶光，于国于家无望。
    天下无能第一，古今不肖无双。
    寄言纨袴与膏粱，莫效此儿形状
  \`\`\`
`

const section = `

  \`\`\`js
     逢人且说三分话，未可全抛一片心。
     一朝马死黄金尽，亲者如同陌路人。
     闲阅遗书思惘然，谁知天道有循环。
     
     功名盖世，无非大梦一场
     富贵惊人，难免无常二字
  \`\`\`
`


// 请v50🔓敏感词。
export default memo(function Home() {

    return (
        <>
            <Markdown content={str} title='' scrollTop={false}/>
            <p className='indent-[2em]'>
                《<u className='hover:before:content-["18🈲️～付费观看"] after:content-["***"] hover:after:content-none'/>》告诉你，钱权酒色都是荒诞，危险都是伴随而来的，正所谓天网恢恢，疏而不漏。
            </p>
            <Markdown content={section} title='' scrollTop={false}/>
            <p>
                我想告诉你在当下太过浮躁，只有
                <u className='hover:before:content-["降低期望，持续热爱"] after:content-["*****"] hover:after:content-none'/>
                方能孜孜不倦。
            </p>
        </>
    )

})