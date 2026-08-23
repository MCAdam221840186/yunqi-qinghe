// This file is generated from scripts/build-growth-review.mjs.
// Update that canonical reviewed source and regenerate instead of editing entries here.

export interface GrowthHighlight {
  readonly diarySlug: string;
  readonly title: string;
  readonly note: string;
  readonly quote?: string;
}

export interface GrowthChild {
  readonly slug: string;
  readonly displayName: string;
  readonly className: string;
  readonly story: {
    readonly summary: string;
    readonly featuredDiarySlug: string;
    readonly highlights: readonly GrowthHighlight[];
  };
}

export interface GrowthDiaryBase {
  readonly slug: string;
  readonly childSlug: string;
  readonly title: string;
  readonly imageId: string;
  readonly dateLabel: string;
  readonly recordedOn: string | null;
  readonly dateConfidence: "exact" | "uncertain" | "missing";
  readonly sessionOrder: number;
  readonly themes: readonly string[];
  readonly transcriptionNotes?: readonly string[];
}

export interface GrowthStructuredDiary extends GrowthDiaryBase {
  readonly sourceKind: "standard";
  readonly kind: "structured";
  readonly fields: {
    readonly learned: string;
    readonly happiest: string;
    readonly message: string;
    readonly comment: string;
  };
}

export interface GrowthPlainDiary extends GrowthDiaryBase {
  readonly sourceKind: "freeform";
  readonly kind: "plain";
  readonly body: string;
}

export type GrowthDiary = GrowthStructuredDiary | GrowthPlainDiary;

export const growthChildren = [
  {
    "slug": "student-001",
    "displayName": "尉邦睿硕",
    "className": "五（2）班",
    "story": {
      "summary": "从告别时的真切不舍，到民族服、化妆与持续阅读的计划，尉邦睿硕把情感、求知和行动都写进了记录。",
      "featuredDiarySlug": "student-001-session-03-b",
      "highlights": [
        {
          "diarySlug": "student-001-session-01-a",
          "title": "认识老师与新朋友",
          "note": "尉邦睿硕在自由书写中回望当天体验：“今日感受。今日，我认识了一些老师；漂亮姐姐，帅气哥哥，认识他们，我很开心！在这里一期，让我们好好…”"
        },
        {
          "diarySlug": "student-001-session-03-b",
          "title": "民族服、化妆与继续阅读",
          "note": "看完一本书后，他把继续阅读写成了给明天的约定。",
          "quote": "在明天继续看书"
        },
        {
          "diarySlug": "student-001-session-04-a",
          "title": "告别老师",
          "note": "尉邦睿硕先写下“伤心告别，我真的很伤心”，又把“继续加油”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-002",
    "displayName": "涂瀚锦硕",
    "className": "五（3）班",
    "story": {
      "summary": "涂瀚锦硕在书法、魔方、民族文化与小书制作之间不断切换，也始终用清晰的目标为自己打气。",
      "featuredDiarySlug": "student-002-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-002-session-01-a",
          "title": "茉莉花与魔方",
          "note": "在合唱和魔方之外，他给自己留下了一句朴素又坚定的提醒。",
          "quote": "好好学习天天向上"
        },
        {
          "diarySlug": "student-002-session-04-a",
          "title": "和老师一起玩",
          "note": "涂瀚锦硕先写下“AI科普、树叶拼拼画、南京大学的历史、科学的智慧”，又把“加油天天向上”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-003",
    "displayName": "谭洲云熙",
    "className": "五（2）班",
    "story": {
      "summary": "谭洲云熙尝试技术、合唱、南京大学历史和AI，在简短记录里留下了直接而真实的课堂感受。",
      "featuredDiarySlug": "student-003-session-01-c",
      "highlights": [
        {
          "diarySlug": "student-003-session-01-a",
          "title": "茉莉花与运动会",
          "note": "谭洲云熙先写下“唱茉莉花”，又把“明天上课累了”留给明天的自己。"
        },
        {
          "diarySlug": "student-003-session-01-c",
          "title": "AI智慧与小星星",
          "note": "他把AI、《小星星》乐谱和经典读本放进了同一天的收获里。",
          "quote": "我昨天，学到了很多知识"
        },
        {
          "diarySlug": "student-003-session-04-a",
          "title": "技术练习",
          "note": "谭洲云熙先写下“技术”，又把“加油”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-004",
    "displayName": "邹永健",
    "className": "五（1）班",
    "story": {
      "summary": "邹永健在书法与电影课中积累体验，也会在一天结束时给明天的自己一个肯定。",
      "featuredDiarySlug": "student-004-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-004-session-03-a",
          "title": "明天一定行",
          "note": "一句重复的自我鼓励，让这张记录卡有了明确的向前感。",
          "quote": "明天一定行"
        },
        {
          "diarySlug": "student-004-session-04-a",
          "title": "伤感告别",
          "note": "邹永健先写下“伤感告别”，又把“感谢老师们的陪伴”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-005",
    "displayName": "毛建鑫",
    "className": "四（2）班",
    "story": {
      "summary": "毛建鑫从魔方、书法走到小书制作和篮球，也能直接确认课堂中的开心，把体验与对明天的期待连在一起。",
      "featuredDiarySlug": "student-005-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-005-session-01-a",
          "title": "魔方、同伴与专心",
          "note": "毛建鑫先写下“还原魔方”，又把“明天更开心，更专心”留给明天的自己。"
        },
        {
          "diarySlug": "student-005-session-02-a",
          "title": "一本小书与篮球",
          "note": "做完一本小书、打过篮球后，他相信明天会更开心。",
          "quote": "明天会更好，明天更开心"
        },
        {
          "diarySlug": "student-005-session-04-a",
          "title": "完整还原魔方",
          "note": "毛建鑫先写下“完整还原魔方”，又把“明天你更棒”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-006",
    "displayName": "杨梓灵",
    "className": "四（1）班",
    "story": {
      "summary": "杨梓灵在风筝、魔方、合唱与科技课堂中练习耐心，也逐渐形成了面对未知的勇气。",
      "featuredDiarySlug": "student-006-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-006-session-01-a",
          "title": "魔方、合唱与勇气",
          "note": "她把不焦虑、往前走写成了给自己的成长提醒。",
          "quote": "别焦虑，大胆往前走，今天的努力，明天一定有收获"
        },
        {
          "diarySlug": "student-006-session-04-a",
          "title": "和老师说话",
          "note": "杨梓灵先写下“我学会了糊做风筝，玩魔方等等”，又把“今天的期待，说不定明天就成功了”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-007",
    "displayName": "段晨希",
    "className": "四（3）班",
    "story": {
      "summary": "段晨希重视手工和活动中的体验，也把与老师逐渐亲近视为夏令营里珍贵的收获。",
      "featuredDiarySlug": "student-007-session-04-a",
      "highlights": [
        {
          "diarySlug": "student-007-session-01-a",
          "title": "手工、魔方和风筝",
          "note": "段晨希先写下“做手工和魔方，做风筝”，又把“能和老师更能亲近一点”留给明天的自己。"
        },
        {
          "diarySlug": "student-007-session-04-a",
          "title": "运动会与放风筝",
          "note": "运动会和放风筝之外，她最在意的是人与人之间的靠近。",
          "quote": "我能和老师再更亲近一步"
        }
      ]
    }
  },
  {
    "slug": "student-008",
    "displayName": "苏怡静",
    "className": "四（3）班",
    "story": {
      "summary": "苏怡静会坦率写下课程里的有趣与无聊，这份不修饰的表达也记录了她真实的参与状态。",
      "featuredDiarySlug": "student-008-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-008-session-01-a",
          "title": "还原魔方与活力",
          "note": "苏怡静先写下“还原魔方”，又把“让明天更有趣”留给明天的自己。"
        },
        {
          "diarySlug": "student-008-session-01-b",
          "title": "有趣，也有无聊",
          "note": "她既写音乐与游戏的趣味，也诚实保留了不喜欢的部分。",
          "quote": "剩下的两节课我感觉很无liáo了"
        },
        {
          "diarySlug": "student-008-session-04-a",
          "title": "离别",
          "note": "苏怡静先写下“离别”，又把“没有明天了”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-009",
    "displayName": "苏雨桐",
    "className": "五（3）班",
    "story": {
      "summary": "苏雨桐从第一次接触钢琴、制作风筝，到书法与快乐表达，不断把新尝试变成可见的自信。",
      "featuredDiarySlug": "student-009-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-009-session-01-a",
          "title": "茉莉花与魔方",
          "note": "苏雨桐先写下“唱茉莉花、快速转魔方”，又把“加油才会有奖励”留给明天的自己。"
        },
        {
          "diarySlug": "student-009-session-01-b",
          "title": "第一次尝试的新鲜收获",
          "note": "第一次见到的钢琴和亲手完成的风筝，构成了她最鲜明的尝试时刻。",
          "quote": "我学会了我之前从未见过的钢琴"
        },
        {
          "diarySlug": "student-009-session-04-a",
          "title": "和夏令营老师在一起",
          "note": "苏雨桐先写下“制作一些手工、唱茉莉花、南京大学历史及科学”，又把“我不会忘了夏令营老师”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-010",
    "displayName": "杜金兰",
    "className": "四（2）班",
    "story": {
      "summary": "杜金兰在魔方、师生互动和告别之间留下简洁记录，也珍惜这段共同度过的时光。",
      "featuredDiarySlug": "student-010-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-010-session-01-a",
          "title": "玩魔方，和老师互动",
          "note": "她用一句话为夏令营画下句点。",
          "quote": "这段有趣的时光结束了"
        },
        {
          "diarySlug": "student-010-session-04-a",
          "title": "和老师一起玩",
          "note": "杜金兰先写下“很多东西的教程”，又把“我们要和老师说再见”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-011",
    "displayName": "张海霞",
    "className": "四（3）班",
    "story": {
      "summary": "张海霞从书法、电影到篮球和小书制作，常常把开心和师生互动写进自己的记录。",
      "featuredDiarySlug": "student-011-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-011-session-01-a",
          "title": "电子琴、篮球与运动会",
          "note": "张海霞先写下“今天我学会了弹奏电子琴”，又把“我想对明天的我说我一定要每天开心”留给明天的自己。"
        },
        {
          "diarySlug": "student-011-session-03-a",
          "title": "一定要开心",
          "note": "看到自己写出的楷书，她笑了，也希望自己一天比一天开心。",
          "quote": "我对后天的我说让我一天比一天开心"
        },
        {
          "diarySlug": "student-011-session-04-a",
          "title": "每天都开心",
          "note": "张海霞先写下“我学会了做风筝，树叶拼贴画”，又把“我想对自己说，要开心”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-012",
    "displayName": "朱华斌",
    "className": "五（3）班",
    "story": {
      "summary": "朱华斌的记录直接而鲜明，实验、电子琴和钢琴都能成为他反复确认的兴趣。",
      "featuredDiarySlug": "student-012-session-03-b",
      "highlights": [
        {
          "diarySlug": "student-012-session-01-a",
          "title": "魔方、钢琴与乒乓球",
          "note": "朱华斌先写下“如何玩魔方”，又把“加油，你会更棒”留给明天的自己。"
        },
        {
          "diarySlug": "student-012-session-03-b",
          "title": "弹钢琴",
          "note": "三个字段都写下同一件事，清楚呈现了他的热爱。",
          "quote": "弹钢琴"
        },
        {
          "diarySlug": "student-012-session-04-a",
          "title": "和老师分别",
          "note": "朱华斌先写下“珍惜别人”，又把“没良心”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-013",
    "displayName": "伍如意",
    "className": "五（3）班",
    "story": {
      "summary": "伍如意在合唱、魔方、运动会、非遗和经典阅读中持续观察，也懂得珍惜每一次相遇。",
      "featuredDiarySlug": "student-013-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-013-session-01-a",
          "title": "合唱、魔方与运动会",
          "note": "丰富活动之后，她把珍惜写成最重要的感受。",
          "quote": "珍惜每一天，珍惜每一次相遇"
        },
        {
          "diarySlug": "student-013-session-04-a",
          "title": "和冰林老师成为朋友",
          "note": "伍如意先写下“各种各样有趣的课程，还学会了感谢”，又把“和冰林老师要一直保持联系”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-014",
    "displayName": "吴心怡",
    "className": "五（1）班",
    "story": {
      "summary": "吴心怡在书法、情绪管理、合唱和小书制作中稳定投入，也不断提醒自己保持快乐。",
      "featuredDiarySlug": "student-014-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-014-session-01-a",
          "title": "合唱、魔方与快乐",
          "note": "吴心怡先写下“唱歌、还原魔方”，又把“明天即使有伤心的事也要开心”留给明天的自己。"
        },
        {
          "diarySlug": "student-014-session-03-a",
          "title": "每天都要开心",
          "note": "学过成语、古诗和情绪管理后，她把快乐留给明天。",
          "quote": "天天开心"
        },
        {
          "diarySlug": "student-014-session-04-a",
          "title": "趣味运动会第三名",
          "note": "吴心怡先写下“怎么制作风筝，怎么用树叶拼贴，怎么用一张A4纸做成一本书，怎么还原魔方，怎么弹钢琴，怎么读经典国学和怎么…”，又把“明天一定要紧紧地记住这八位老师”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-015",
    "displayName": "王诗雨",
    "className": "五（1）班",
    "story": {
      "summary": "王诗雨喜欢在合唱、魔方、绘画和风筝制作中寻找开心，也会认真记录自己的成就感。",
      "featuredDiarySlug": "student-015-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-015-session-01-a",
          "title": "唱歌和魔方",
          "note": "她把最简单的愿望留在卡片上。",
          "quote": "希望可以开心"
        },
        {
          "diarySlug": "student-015-session-04-a",
          "title": "运动会的开心",
          "note": "王诗雨先写下“做风筝，用树叶拼出一幅画，用A4纸做一本书”，又把“天天开心”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-016",
    "displayName": "汪澄",
    "className": "五（3）班",
    "story": {
      "summary": "汪澄从情绪管理和电影课里认识自己的感受，也用一句笃定的话确认成长会继续发生。",
      "featuredDiarySlug": "student-016-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-016-session-03-a",
          "title": "管理心情",
          "note": "学会管理心情之后，她给未来的自己留下肯定。",
          "quote": "一定会更好"
        },
        {
          "diarySlug": "student-016-session-04-a",
          "title": "和老师互相帮助",
          "note": "汪澄先写下“和老师们的互相帮助”，又把“不，我要对老师说，我希望你们的生活过得更好”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-017",
    "displayName": "张艺",
    "className": "五（2）班",
    "story": {
      "summary": "张艺的记录细腻完整，她能从纸鸢、AI、音乐和经典阅读中提取感受，也能主动追问新的奥秘。",
      "featuredDiarySlug": "student-017-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-017-session-01-a",
          "title": "合唱、魔方与运动",
          "note": "张艺先写下“我学会了唱茉莉花，还了解了江苏民歌，在老师的帮助下快速还原了我的思维力魔方，但是发现魔方对于我来说很困难”，又把“希望明天能学到更多知识，接触一些新鲜事物”留给明天的自己。"
        },
        {
          "diarySlug": "student-017-session-01-b",
          "title": "传统与新知碰撞的一天",
          "note": "她在完整弹完右手部分时感受到清晰的成就感。",
          "quote": "我觉得特别有成就感"
        },
        {
          "diarySlug": "student-017-session-04-a",
          "title": "和老师唱歌",
          "note": "张艺先写下“做风筝、读经典，唱《茉莉花》、还原魔方、写毛笔字、如何管理情绪”，又把“希望和老师们天天开心”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-018",
    "displayName": "陈奕涵",
    "className": "四（3）班",
    "story": {
      "summary": "陈奕涵会观察课堂秩序，也在风筝、书法、情绪管理和小书制作中持续修正自己。",
      "featuredDiarySlug": "student-018-session-04-a",
      "highlights": [
        {
          "diarySlug": "student-018-session-01-a",
          "title": "茉莉花、魔方与风筝",
          "note": "陈奕涵先写下“唱茉莉花，和复原魔方”，又把“今天的努力，成就明天的自己”留给明天的自己。"
        },
        {
          "diarySlug": "student-018-session-04-a",
          "title": "奖状与书签",
          "note": "奖状与书签之外，她把努力和明天连接在了一起。",
          "quote": "今天的努力，成就明天的自己"
        }
      ]
    }
  },
  {
    "slug": "student-019",
    "displayName": "罗子轩",
    "className": "四（1）班",
    "story": {
      "summary": "罗子轩在魔方、风筝、AI和经典课堂中保持活力，并逐渐把勇敢落实为明确的自我提醒。",
      "featuredDiarySlug": "student-019-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-019-session-01-a",
          "title": "还原魔方与勇气",
          "note": "他把不放弃和勇敢行动写给了明天。",
          "quote": "不要放弃想做的事情，要勇敢去做"
        },
        {
          "diarySlug": "student-019-session-04-a",
          "title": "电影课",
          "note": "罗子轩先写下“我学会了写毛笔字，放风筝，玩mo方”，又把“不要放弃，要勇敢去追逐梦想”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-020",
    "displayName": "杨雨涵",
    "className": "四（1）班",
    "story": {
      "summary": "杨雨涵从风筝制作、AI、钢琴和经典阅读中发现不同的奇妙，也能用自己的语言串联多门课程。",
      "featuredDiarySlug": "student-020-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-020-session-01-a",
          "title": "魔方、唱歌与运动会",
          "note": "杨雨涵先写下“玩魔方、唱歌”，又把“每天开心，成为更好的自己”留给明天的自己。"
        },
        {
          "diarySlug": "student-020-session-01-b",
          "title": "风筝、AI、乐谱与经典",
          "note": "她把动手、科技、音乐和阅读放进同一段收获里。",
          "quote": "经典书让我感受到书的趣味"
        },
        {
          "diarySlug": "student-020-session-04-a",
          "title": "认识南京大学",
          "note": "杨雨涵先写下“毛笔字，民族语，mo方，放风筝，做书”，又把“过好每一天的自己”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-021",
    "displayName": "王蓉",
    "className": "四（2）班",
    "story": {
      "summary": "王蓉在书法、民族文化、小书制作之外明确写下自己对钢琴的喜欢，也敏锐感受到AI的力量。",
      "featuredDiarySlug": "student-021-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-021-session-01-a",
          "title": "魔方与勇敢",
          "note": "王蓉先写下“让我学会了玩魔方”，又把“度过一天，勇敢就上升3点”留给明天的自己。"
        },
        {
          "diarySlug": "student-021-session-01-b",
          "title": "喜欢钢琴，也看见AI",
          "note": "兴趣与新科技在一句话里自然相遇。",
          "quote": "我感觉AI非常强大"
        },
        {
          "diarySlug": "student-021-session-04-a",
          "title": "为什么要读书",
          "note": "王蓉先写下“为什么要学习”，又把“我要更加努力”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-022",
    "displayName": "杨莉蓉",
    "className": "四（1）班",
    "story": {
      "summary": "杨莉蓉在书法、情绪、民族文化和南京大学课程中不断积累，也把进步视为成为更好自己的路径。",
      "featuredDiarySlug": "student-022-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-022-session-01-a",
          "title": "魔方、唱歌与互动",
          "note": "杨莉蓉先写下“魔方、唱歌”，又把“每天进步”留给明天的自己。"
        },
        {
          "diarySlug": "student-022-session-02-a",
          "title": "民族文化与南京大学",
          "note": "她给成长写下了清楚的因果关系。",
          "quote": "只要进步才能成为更好的自己"
        },
        {
          "diarySlug": "student-022-session-04-a",
          "title": "和老师一起玩",
          "note": "杨莉蓉先写下“很多的东西的教程”，又把“我们要和老师说再见”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-023",
    "displayName": "罗子桐",
    "className": "四（3）班",
    "story": {
      "summary": "罗子桐参与了树叶拼贴、扎染、风筝、钢琴、AI与书法，记录里保留着活泼、跳脱的个人语气。",
      "featuredDiarySlug": "student-023-session-04-a",
      "highlights": [
        {
          "diarySlug": "student-023-session-02-a",
          "title": "做小书",
          "note": "罗子桐先写下“做小书”，又把“继续加油”留给明天的自己。"
        },
        {
          "diarySlug": "student-023-session-04-a",
          "title": "吃了个土豆",
          "note": "一长串课程名称，呈现了他丰富而密集的夏令营体验。",
          "quote": "树叶拼贴画，唱歌，扎染，做风筝"
        }
      ]
    }
  },
  {
    "slug": "student-024",
    "displayName": "王梓璎",
    "className": "五（1）班",
    "story": {
      "summary": "王梓璎从电影、书法到唱歌、魔方和南京大学课程，持续表达对新知识的期待。",
      "featuredDiarySlug": "student-024-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-024-session-01-a",
          "title": "唱歌、魔方与游戏",
          "note": "游戏之后，她仍然想继续学到更多。",
          "quote": "学会更多知识"
        },
        {
          "diarySlug": "student-024-session-04-a",
          "title": "收到礼盒",
          "note": "王梓璎先写下“这次夏令营的所有知识”，又把“夏令营结束了”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-025",
    "displayName": "王诗银",
    "className": "四（2）班",
    "story": {
      "summary": "王诗银在情绪管理、书法、民族文化和动手制作中稳步参与，也愿意相信自己会越来越好。",
      "featuredDiarySlug": "student-025-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-025-session-01-a",
          "title": "收获很多知识",
          "note": "王诗银在自由书写中回望当天体验：“收获了很多知识”"
        },
        {
          "diarySlug": "student-025-session-03-a",
          "title": "明天会更好",
          "note": "改变情绪、写下毛笔字后，她把肯定留给明天。",
          "quote": "明天我会更好"
        },
        {
          "diarySlug": "student-025-session-04-a",
          "title": "和老师一起玩",
          "note": "王诗银先写下“很多东西”，又把“我和老师说再见”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-026",
    "displayName": "周志胜",
    "className": "四（2）班",
    "story": {
      "summary": "周志胜从合影、魔方、朋友和小书制作中记录日常片段，语言简洁但保留了清楚的前进方向。",
      "featuredDiarySlug": "student-026-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-026-session-01-a",
          "title": "魔方与朋友",
          "note": "和朋友相处的快乐之后，他提醒明天继续努力。",
          "quote": "明天加油"
        },
        {
          "diarySlug": "student-026-session-03-a",
          "title": "写字与伙伴",
          "note": "周志胜把“写毛笔字”记在卡上，留下当天最直接的感受。"
        }
      ]
    }
  },
  {
    "slug": "student-027",
    "displayName": "张浩程",
    "className": "五（2）班",
    "story": {
      "summary": "张浩程参与领奖、合唱、魔方、做书和书法，常用短句给自己留下持续行动的提示。",
      "featuredDiarySlug": "student-027-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-027-session-01-a",
          "title": "还原魔方与唱歌",
          "note": "还原魔方并学会唱歌后，他选择继续加油。",
          "quote": "继续加油"
        },
        {
          "diarySlug": "student-027-session-04-a",
          "title": "合影",
          "note": "张浩程把“吃东西”记在卡上，留下当天最直接的感受。"
        }
      ]
    }
  },
  {
    "slug": "student-028",
    "displayName": "王弘嘉",
    "className": "五（2）班",
    "story": {
      "summary": "王弘嘉从领奖、魔方和风筝走到AI、电子琴与科学实验，逐步累积动手完成后的成就感。",
      "featuredDiarySlug": "student-028-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-028-session-01-a",
          "title": "还原魔方与运动会",
          "note": "王弘嘉先写下“还原魔方”，又把“专心听课，开心”留给明天的自己。"
        },
        {
          "diarySlug": "student-028-session-02-a",
          "title": "科学实验",
          "note": "在科学室完成小实验后，他仍希望开心面对明天。",
          "quote": "要开心的面对明天"
        },
        {
          "diarySlug": "student-028-session-04-a",
          "title": "上台领奖",
          "note": "王弘嘉先写下“我学会了领奖的快乐”，又把“每天好好休息”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-029",
    "displayName": "肖家媛",
    "className": "四（2）班",
    "story": {
      "summary": "肖家媛在钢琴、手工、科学实验、电影和书法中持续尝试，也越来越敢于确认自己的能力。",
      "featuredDiarySlug": "student-029-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-029-session-01-a",
          "title": "还原魔方",
          "note": "肖家媛先写下“还原魔方”，又把“比昨天更厉害”留给明天的自己。"
        },
        {
          "diarySlug": "student-029-session-02-a",
          "title": "一张纸做成一本书",
          "note": "把一张纸做成书之后，她写下了鲜明的自信。",
          "quote": "加油！我一定会厉害"
        },
        {
          "diarySlug": "student-029-session-04-a",
          "title": "趣味运动会",
          "note": "肖家媛先写下“弹钢琴、做手工”，又把“要更加强壮”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-030",
    "displayName": "徐骏林",
    "className": "五（3）班",
    "story": {
      "summary": "徐骏林在师生互动、做书和科学实验中保持简洁直接的表达，用行动和一句加油记录参与。",
      "featuredDiarySlug": "student-030-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-030-session-02-a",
          "title": "做书与科学实验",
          "note": "做书与实验之后，他给自己留下最短也最明确的鼓励。",
          "quote": "加油"
        },
        {
          "diarySlug": "student-030-session-04-a",
          "title": "做书与魔方",
          "note": "徐骏林先写下“做书、玩魔方、写毛笔字”，又把“加油”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-031",
    "displayName": "罗文秀",
    "className": "四（1）班",
    "story": {
      "summary": "罗文秀从合唱、魔方、做书和经典故事中提炼价值判断，逐渐形成不攀比、做好自己的认识。",
      "featuredDiarySlug": "student-031-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-031-session-01-a",
          "title": "唱茉莉花，还原魔方",
          "note": "罗文秀先写下“1.会唱茉莉花 2.会如何还原魔方”，又把“快乐是免费的！每天都要开心”留给明天的自己。"
        },
        {
          "diarySlug": "student-031-session-01-b",
          "title": "不攀比，努力做好自己",
          "note": "她把课堂人物和故事转化为对自己的要求。",
          "quote": "做好自己，不攀比"
        },
        {
          "diarySlug": "student-031-session-04-a",
          "title": "拍照",
          "note": "罗文秀先写下“拍照”，又把“快乐”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-032",
    "displayName": "杨承宏",
    "className": "四（1）班",
    "story": {
      "summary": "杨承宏在书法和心理课里练习规范与坚持，也会正视提升过程中需要继续努力的部分。",
      "featuredDiarySlug": "student-032-session-03-a",
      "highlights": [
        {
          "diarySlug": "student-032-session-03-a",
          "title": "坚持下去",
          "note": "她把坚持写成一条向上的路径。",
          "quote": "一定要坚持下去"
        }
      ]
    }
  },
  {
    "slug": "student-033",
    "displayName": "张韵涵",
    "className": "五（2）班",
    "story": {
      "summary": "张韵涵参与小书、南京大学、科学实验和民族文化课程，也愿意在玩耍与努力之间找到平衡。",
      "featuredDiarySlug": "student-033-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-033-session-01-a",
          "title": "合唱与魔方",
          "note": "张韵涵先写下“合唱、玩魔方”，又把“快乐学习”留给明天的自己。"
        },
        {
          "diarySlug": "student-033-session-02-a",
          "title": "纸书、大学与民族",
          "note": "她把开心和努力并列写进给自己的话。",
          "quote": "多开心，努力"
        },
        {
          "diarySlug": "student-033-session-04-a",
          "title": "吃零食",
          "note": "张韵涵先写下“玩一些游戏”，又把“你要开心”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-034",
    "displayName": "袁道宗",
    "className": "五（3）班",
    "story": {
      "summary": "袁道宗在魔方、合唱、南京大学和科学实验中不断动手，也懂得把珍惜放进每天的学习。",
      "featuredDiarySlug": "student-034-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-034-session-01-a",
          "title": "复原魔方，参加合唱团",
          "note": "袁道宗先写下“如何复原魔方的教程，学会唱茉莉花加入合唱团”，又把“加油，努力就算发生不开心的事也要努力”留给明天的自己。"
        },
        {
          "diarySlug": "student-034-session-02-a",
          "title": "和老师做科学实验",
          "note": "和老师一起做实验后，他提醒自己珍惜每一天。",
          "quote": "加油，珍惜每一天"
        },
        {
          "diarySlug": "student-034-session-04-a",
          "title": "还原魔方",
          "note": "袁道宗先写下“如何还原魔方，我学会了好多”，又把“加油，明天会更好”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-035",
    "displayName": "李森钰",
    "className": "四（2）班",
    "story": {
      "summary": "李森钰在魔方、民族文化、小书、钢琴、风筝、AI和经典课程中广泛尝试，能够清楚回顾每门课的收获。",
      "featuredDiarySlug": "student-035-session-01-b",
      "highlights": [
        {
          "diarySlug": "student-035-session-01-a",
          "title": "魔方与运动会",
          "note": "李森钰先写下“玩魔方”，又把“要学习得更努力”留给明天的自己。"
        },
        {
          "diarySlug": "student-035-session-01-b",
          "title": "四门课里的动手与新知",
          "note": "他用四个要点把一天的动手与新知完整串联起来。",
          "quote": "AI课让我们学习了怎么使用AI"
        },
        {
          "diarySlug": "student-035-session-04-a",
          "title": "有奖状",
          "note": "李森钰先写下“拍照”，又把“有一天我们一定会再见”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-036",
    "displayName": "李杰冲",
    "className": "五（2）班",
    "story": {
      "summary": "李杰冲从手工、魔方和书法走到小书结构与南京大学历史，始终保持对知识和技能的兴趣。",
      "featuredDiarySlug": "student-036-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-036-session-01-a",
          "title": "茉莉花与魔方",
          "note": "李杰冲先写下“唱茉莉花、魔方”，又把“学到更多知识和技能”留给明天的自己。"
        },
        {
          "diarySlug": "student-036-session-02-a",
          "title": "一本书的结构",
          "note": "亲手完成一本书后，他仍提醒自己好好学习。",
          "quote": "好好学知识"
        },
        {
          "diarySlug": "student-036-session-04-a",
          "title": "发到奖状",
          "note": "李杰冲先写下“做手工、画画、玩一些小游戏”，又把“好好记住这些时光”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-037",
    "displayName": "王维",
    "className": "五（3）班",
    "story": {
      "summary": "王维在书法、电影、魔方和运动会中留下直接记录，即使表达很短，也能看出他对操作技能的关注。",
      "featuredDiarySlug": "student-037-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-037-session-01-a",
          "title": "快速魔方与运动会",
          "note": "他最清楚地记下了快速复原魔方的步骤。",
          "quote": "快速魔方的一些步骤"
        },
        {
          "diarySlug": "student-037-session-02-a",
          "title": "做小书本",
          "note": "王维先写下“做小书本”，又把“一定要更好”留给明天的自己。"
        }
      ]
    }
  },
  {
    "slug": "student-038",
    "displayName": "柏承涵",
    "className": "四（3）班",
    "story": {
      "summary": "柏承涵在合唱、魔方和运动活动中保持投入，也把坚持写成给自己的明确提醒。",
      "featuredDiarySlug": "student-038-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-038-session-01-a",
          "title": "茉莉花、魔方与篮球",
          "note": "唱过《茉莉花》、还原魔方并参加球类活动后，他提醒自己坚持。",
          "quote": "一定要坚持住"
        }
      ]
    }
  },
  {
    "slug": "student-039",
    "displayName": "柳诗宏",
    "className": "四（3）班",
    "story": {
      "summary": "柳诗宏在民族知识和手工制作中找到兴趣，也把坚持和学业进步写成给自己的目标。",
      "featuredDiarySlug": "student-039-session-02-a",
      "highlights": [
        {
          "diarySlug": "student-039-session-02-a",
          "title": "民族知识与手工",
          "note": "完成风车后，他给自己留下了具体的坚持目标。",
          "quote": "你一定要坚持下去，还要让成绩变好"
        }
      ]
    }
  },
  {
    "slug": "student-040",
    "displayName": "王莉妍",
    "className": "五（2）班",
    "story": {
      "summary": "王莉妍从风筝、AI、钢琴和经典导引中获得丰富收获，也在书法课里保留了关心老师的可爱表达。",
      "featuredDiarySlug": "student-040-session-01-a",
      "highlights": [
        {
          "diarySlug": "student-040-session-01-a",
          "title": "风筝、AI与经典导引",
          "note": "她把四门课的收获集中写在第一次自由记录里。",
          "quote": "我还知道了风筝该怎么做，什么是AI，学会弹钢琴"
        },
        {
          "diarySlug": "student-040-session-03-a",
          "title": "毛笔书写",
          "note": "王莉妍先写下“学会、写毛笔”，又把“妍姐明天不要紧张”留给明天的自己。"
        }
      ]
    }
  }
] as const satisfies readonly GrowthChild[];

export const growthDiaries = [
  {
    "slug": "student-001-session-04-a",
    "childSlug": "student-001",
    "title": "告别老师",
    "imageId": "growth-card-001",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "告别",
      "情感",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "伤心告别，我真的很伤心",
      "happiest": "伤心，告别老师",
      "message": "继续加油",
      "comment": ""
    }
  },
  {
    "slug": "student-002-session-04-a",
    "childSlug": "student-002",
    "title": "和老师一起玩",
    "imageId": "growth-card-002",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "AI科普",
      "树叶拼贴",
      "南京大学",
      "科学",
      "师生互动"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "AI科普、树叶拼拼画、南京大学的历史、科学的智慧",
      "happiest": "和老师一起玩",
      "message": "加油天天向上",
      "comment": ""
    }
  },
  {
    "slug": "student-003-session-04-a",
    "childSlug": "student-003",
    "title": "技术练习",
    "imageId": "growth-card-003",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "技术",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "技术",
      "happiest": "技术",
      "message": "加油",
      "comment": ""
    }
  },
  {
    "slug": "student-004-session-04-a",
    "childSlug": "student-004",
    "title": "伤感告别",
    "imageId": "growth-card-004",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "告别",
      "奖状",
      "感恩"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "伤感告别",
      "happiest": "发奖状",
      "message": "感谢老师们的陪伴",
      "comment": ""
    }
  },
  {
    "slug": "student-005-session-04-a",
    "childSlug": "student-005",
    "title": "完整还原魔方",
    "imageId": "growth-card-005",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "魔方",
      "成就",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "完整还原魔方",
      "happiest": "魔方还原",
      "message": "明天你更棒。",
      "comment": ""
    }
  },
  {
    "slug": "student-006-session-04-a",
    "childSlug": "student-006",
    "title": "和老师说话",
    "imageId": "growth-card-006",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "魔方",
      "师生互动",
      "期待"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了糊做风筝，玩魔方等等。",
      "happiest": "我最开心和老师说话",
      "message": "今天的期待，说不定明天就成功了。",
      "comment": ""
    }
  },
  {
    "slug": "student-007-session-04-a",
    "childSlug": "student-007",
    "title": "运动会与放风筝",
    "imageId": "growth-card-007",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "手工",
      "趣味运动会",
      "风筝",
      "师生互动"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "知识、手工。",
      "happiest": "是运动会、放风筝。",
      "message": "我能和老师再更亲近一步。",
      "comment": ""
    }
  },
  {
    "slug": "student-008-session-04-a",
    "childSlug": "student-008",
    "title": "离别",
    "imageId": "growth-card-008",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "告别",
      "情感"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "离别",
      "happiest": "没有最开心的，只有最伤心的",
      "message": "没有明天了",
      "comment": ""
    }
  },
  {
    "slug": "student-009-session-04-a",
    "childSlug": "student-009",
    "title": "和夏令营老师在一起",
    "imageId": "growth-card-009",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "手工",
      "合唱",
      "南京大学",
      "科学",
      "师生情"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "制作一些手工、唱茉莉花、南京大学历史及科学",
      "happiest": "和夏令营老师一起都很开心。",
      "message": "我不会忘了夏令营老师",
      "comment": ""
    }
  },
  {
    "slug": "student-010-session-04-a",
    "childSlug": "student-010",
    "title": "和老师一起玩",
    "imageId": "growth-card-010",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "学习",
      "师生互动",
      "告别"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "很多东西的教程。",
      "happiest": "和老师一起玩。",
      "message": "我们要和老师说再见。",
      "comment": ""
    }
  },
  {
    "slug": "student-011-session-04-a",
    "childSlug": "student-011",
    "title": "每天都开心",
    "imageId": "growth-card-011",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "树叶拼贴",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了做风筝，树叶拼贴画。",
      "happiest": "我每天都开心。",
      "message": "我想对自己说，要开心。",
      "comment": ""
    }
  },
  {
    "slug": "student-012-session-04-a",
    "childSlug": "student-012",
    "title": "和老师分别",
    "imageId": "growth-card-012",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "珍惜",
      "告别",
      "情感"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "珍惜别人。",
      "happiest": "伤心，和老师分别。",
      "message": "没良心",
      "comment": ""
    }
  },
  {
    "slug": "student-013-session-04-a",
    "childSlug": "student-013",
    "title": "和冰林老师成为朋友",
    "imageId": "growth-card-013",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "课程",
      "感恩",
      "师生情",
      "友谊"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "各种各样有趣的课程，还学会了感谢！",
      "happiest": "我觉得这次夏令营最开心的事就是和冰林老师相遇并做成无法忘记的朋友。",
      "message": "和冰林老师要一直保持联系。",
      "comment": ""
    }
  },
  {
    "slug": "student-014-session-04-a",
    "childSlug": "student-014",
    "title": "趣味运动会第三名",
    "imageId": "growth-card-014",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "树叶拼贴",
      "手工书",
      "魔方",
      "钢琴",
      "经典国学",
      "绘画",
      "趣味运动会",
      "师生情"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "怎么制作风筝，怎么用树叶拼贴，怎么用一张A4纸做成一本书，怎么还原魔方，怎么弹钢琴，怎么读经典国学和怎么用彩笔画画。",
      "happiest": "趣味运动会得了第三名，挺开心。",
      "message": "明天一定要紧紧地记住这八位老师。",
      "comment": ""
    }
  },
  {
    "slug": "student-015-session-04-a",
    "childSlug": "student-015",
    "title": "运动会的开心",
    "imageId": "growth-card-015",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "树叶拼贴",
      "手工书",
      "趣味运动会",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做风筝，用树叶拼出一幅画，用A4纸做一本书。",
      "happiest": "运动会我很高兴、开心",
      "message": "天天开心",
      "comment": ""
    }
  },
  {
    "slug": "student-016-session-04-a",
    "childSlug": "student-016",
    "title": "和老师互相帮助",
    "imageId": "growth-card-016",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "互助",
      "告别",
      "祝福",
      "师生情"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "和老师们的互相帮助",
      "happiest": "没有，因为我们今天都要走了，要和老师们告别了",
      "message": "不，我要对老师说，我希望你们的生活过得更好。",
      "comment": ""
    }
  },
  {
    "slug": "student-017-session-04-a",
    "childSlug": "student-017",
    "title": "和老师唱歌",
    "imageId": "growth-card-017",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "经典",
      "合唱",
      "魔方",
      "书法",
      "情绪管理",
      "师生互动"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做风筝、读经典，唱《茉莉花》、还原魔方、写毛笔字、如何管理情绪。",
      "happiest": "和老师唱歌。",
      "message": "希望和老师们天天开心",
      "comment": ""
    }
  },
  {
    "slug": "student-018-session-04-a",
    "childSlug": "student-018",
    "title": "奖状与书签",
    "imageId": "growth-card-018",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "风筝",
      "树叶拼贴",
      "手工书",
      "书法",
      "奖状",
      "书签",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "放风筝、树叶拼贴、用A4纸做书、用毛笔来写字。",
      "happiest": "老师给我们发了奖状，还有张旭老师给我们做了书签。",
      "message": "今天的努力，成就明天的自己。",
      "comment": ""
    }
  },
  {
    "slug": "student-019-session-04-a",
    "childSlug": "student-019",
    "title": "电影课",
    "imageId": "growth-card-019",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "书法",
      "风筝",
      "魔方",
      "电影",
      "梦想"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了写毛笔字，放风筝，玩mo方。",
      "happiest": "一天下午我们上了一节电影课。",
      "message": "不要放弃，要勇敢去追逐梦想。",
      "comment": ""
    }
  },
  {
    "slug": "student-020-session-04-a",
    "childSlug": "student-020",
    "title": "认识南京大学",
    "imageId": "growth-card-020",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "书法",
      "民族语",
      "魔方",
      "风筝",
      "手工书",
      "南京大学",
      "电影"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "毛笔字，民族语，mo方，放风筝，做书。",
      "happiest": "认识南京大学，看电影",
      "message": "过好每一天的自己",
      "comment": ""
    }
  },
  {
    "slug": "student-021-session-04-a",
    "childSlug": "student-021",
    "title": "为什么要读书",
    "imageId": "growth-card-021",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "学习意义",
      "阅读",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "为什么要学习。",
      "happiest": "我懂得了为什么要读书。",
      "message": "我要更加努力。",
      "comment": ""
    }
  },
  {
    "slug": "student-022-session-04-a",
    "childSlug": "student-022",
    "title": "和老师一起玩",
    "imageId": "growth-card-022",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "学习",
      "师生互动",
      "告别"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "很多的东西的教程",
      "happiest": "和老师一起玩",
      "message": "我们要和老师说再见",
      "comment": ""
    }
  },
  {
    "slug": "student-023-session-04-a",
    "childSlug": "student-023",
    "title": "吃了个土豆",
    "imageId": "growth-card-023",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "树叶拼贴",
      "唱歌",
      "扎染",
      "风筝",
      "经典",
      "钢琴",
      "自我保护",
      "AI",
      "书法"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "树叶拼贴画，唱歌，扎染，做风筝，读经典，弹钢琴，保护自己，AI人工智能的、书法的重要。",
      "happiest": "吃了个土豆",
      "message": "壮阳树！",
      "comment": ""
    }
  },
  {
    "slug": "student-024-session-04-a",
    "childSlug": "student-024",
    "title": "收到礼盒",
    "imageId": "growth-card-024",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "夏令营",
      "知识",
      "礼物",
      "告别"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "这次夏令营的所有知识",
      "happiest": "收到老师发我的礼盒",
      "message": "夏令营结束了",
      "comment": ""
    }
  },
  {
    "slug": "student-025-session-04-a",
    "childSlug": "student-025",
    "title": "和老师一起玩",
    "imageId": "growth-card-025",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "学习",
      "师生互动",
      "告别"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "很多东西。",
      "happiest": "和老师一起玩。",
      "message": "我和老师说再见。",
      "comment": ""
    }
  },
  {
    "slug": "student-026-session-04-a",
    "childSlug": "student-026",
    "title": "无",
    "imageId": "growth-card-026",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "无"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "无",
      "happiest": "无",
      "message": "无",
      "comment": ""
    }
  },
  {
    "slug": "student-027-session-04-a",
    "childSlug": "student-027",
    "title": "合影",
    "imageId": "growth-card-027",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "餐食",
      "合影"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "吃东西",
      "happiest": "合影",
      "message": "无",
      "comment": ""
    }
  },
  {
    "slug": "student-028-session-04-a",
    "childSlug": "student-028",
    "title": "上台领奖",
    "imageId": "growth-card-028",
    "dateLabel": "7月20日（原写7月18日后改）",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "领奖",
      "快乐",
      "休息"
    ],
    "transcriptionNotes": [
      "日期原写7月18日，后改为7月20日"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了领奖的快乐",
      "happiest": "上台领奖",
      "message": "每天好好休息",
      "comment": ""
    }
  },
  {
    "slug": "student-029-session-04-a",
    "childSlug": "student-029",
    "title": "趣味运动会",
    "imageId": "growth-card-029",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "钢琴",
      "手工",
      "趣味运动会",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "弹钢琴、做手工",
      "happiest": "参加趣味运动会",
      "message": "要更加强壮",
      "comment": ""
    }
  },
  {
    "slug": "student-030-session-04-a",
    "childSlug": "student-030",
    "title": "做书与魔方",
    "imageId": "growth-card-030",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "手工书",
      "魔方",
      "书法",
      "师生互动",
      "自我鼓励"
    ],
    "transcriptionNotes": [
      "最开心字段后续笔迹无法可靠辨认"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书、玩魔方、写毛笔字",
      "happiest": "和老师",
      "message": "加油",
      "comment": ""
    }
  },
  {
    "slug": "student-031-session-04-a",
    "childSlug": "student-031",
    "title": "拍照",
    "imageId": "growth-card-031",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "拍照",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "拍照",
      "happiest": "拍照",
      "message": "快乐",
      "comment": ""
    }
  },
  {
    "slug": "student-032-session-04-a",
    "childSlug": "student-032",
    "title": "无",
    "imageId": "growth-card-032",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "无"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "无",
      "happiest": "无",
      "message": "无",
      "comment": ""
    }
  },
  {
    "slug": "student-033-session-04-a",
    "childSlug": "student-033",
    "title": "吃零食",
    "imageId": "growth-card-033",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "游戏",
      "零食",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "玩一些游戏。",
      "happiest": "我吃零食。",
      "message": "你要开心。",
      "comment": ""
    }
  },
  {
    "slug": "student-034-session-04-a",
    "childSlug": "student-034",
    "title": "还原魔方",
    "imageId": "growth-card-034",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "魔方",
      "自由活动",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何还原魔方，我学会了好多。",
      "happiest": "自由的玩。",
      "message": "加油，明天会更好",
      "comment": ""
    }
  },
  {
    "slug": "student-035-session-04-a",
    "childSlug": "student-035",
    "title": "有奖状",
    "imageId": "growth-card-035",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "拍照",
      "奖状",
      "告别"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "拍照",
      "happiest": "有奖状",
      "message": "有一天我们一定会再见。",
      "comment": ""
    }
  },
  {
    "slug": "student-036-session-04-a",
    "childSlug": "student-036",
    "title": "发到奖状",
    "imageId": "growth-card-036",
    "dateLabel": "7月20日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 4,
    "themes": [
      "手工",
      "绘画",
      "游戏",
      "奖状",
      "回忆"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做手工、画画、玩一些小游戏",
      "happiest": "发到了奖状。",
      "message": "好好记住这些时光。",
      "comment": ""
    }
  },
  {
    "slug": "student-002-session-03-a",
    "childSlug": "student-002",
    "title": "小楷结构",
    "imageId": "growth-card-037",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "小楷",
      "书法",
      "自我鼓励"
    ],
    "transcriptionNotes": [
      "最开心字段末尾另有无法可靠辨认笔画"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何控制小楷结构",
      "happiest": "体会了小楷结构",
      "message": "加油",
      "comment": "愿你跨越山水，行至辽野，终点是百花齐放的春天"
    }
  },
  {
    "slug": "student-024-session-03-a",
    "childSlug": "student-024",
    "title": "看电影",
    "imageId": "growth-card-038",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "休息"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "书法",
      "happiest": "看电影",
      "message": "不用来了",
      "comment": "明天可以好好休息啦！"
    }
  },
  {
    "slug": "student-034-session-03-a",
    "childSlug": "student-034",
    "title": "珍惜当下",
    "imageId": "growth-card-039",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "团结",
      "电影",
      "珍惜当下"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "团结就是一种力量",
      "happiest": "终于看了有趣的电影",
      "message": "珍惜当下。",
      "comment": "电影很精彩，今夕和当下也很好，希望你能一直珍惜当下"
    }
  },
  {
    "slug": "student-005-session-03-a",
    "childSlug": "student-005",
    "title": "和老师打篮球",
    "imageId": "growth-card-040",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "篮球",
      "师生互动",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "和老师打篮球",
      "message": "你更棒",
      "comment": "希望你能成为更棒的自己！"
    }
  },
  {
    "slug": "student-004-session-03-a",
    "childSlug": "student-004",
    "title": "明天一定行",
    "imageId": "growth-card-041",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "看电影",
      "message": "明天一定行",
      "comment": "明天一定行！"
    }
  },
  {
    "slug": "student-015-session-03-a",
    "childSlug": "student-015",
    "title": "天天开心",
    "imageId": "growth-card-042",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪管理",
      "情绪书签",
      "电影",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "用书法写、认识自己的情绪和制作情绪书签",
      "happiest": "看电影和写书法",
      "message": "天天开心",
      "comment": "祝你天天开心！"
    }
  },
  {
    "slug": "student-023-session-03-a",
    "childSlug": "student-023",
    "title": "好多鱼",
    "imageId": "growth-card-043",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "情绪管理",
      "零食",
      "师生互动",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "认识一个人的情绪",
      "happiest": "老师给我吃“好多鱼”",
      "message": "醒梦加油",
      "comment": "加油！“好多鱼”很好吃"
    }
  },
  {
    "slug": "student-011-session-03-a",
    "childSlug": "student-011",
    "title": "一定要开心",
    "imageId": "growth-card-044",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "快乐",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了写书法。",
      "happiest": "今天我最开心的事情楷书书法我写的字让我很想笑",
      "message": "我对后天的我说让我一天比一天开心。",
      "comment": "一定要开心哦！"
    }
  },
  {
    "slug": "student-014-session-03-a",
    "childSlug": "student-014",
    "title": "每天都要开心",
    "imageId": "growth-card-045",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "成语",
      "古诗",
      "情绪管理",
      "电影",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "怎么拿毛笔写四字成语和古诗和怎么管理自己的情绪。",
      "happiest": "下午第一节课我们看了电影。",
      "message": "天天开心",
      "comment": "很棒！每天都要开心啊！"
    }
  },
  {
    "slug": "student-006-session-03-a",
    "childSlug": "student-006",
    "title": "今天的努力",
    "imageId": "growth-card-046",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪表达",
      "电影",
      "师生互动",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写书法，表达情绪。",
      "happiest": "看电影，和老师讲话。",
      "message": "今天的努力，明天一定会有收获。",
      "comment": "希望今天的努力能让你成为更好的自己！"
    }
  },
  {
    "slug": "student-025-session-03-a",
    "childSlug": "student-025",
    "title": "明天会更好",
    "imageId": "growth-card-047",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "情绪管理",
      "书法",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "改变心理的情绪。",
      "happiest": "写毛笔字。",
      "message": "明天我会更好。",
      "comment": "明天一定会更好的！"
    }
  },
  {
    "slug": "student-030-session-03-a",
    "childSlug": "student-030",
    "title": "朝春天走去",
    "imageId": "growth-card-048",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "绘画",
      "电影",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "画画",
      "happiest": "看电影",
      "message": "加油！",
      "comment": "那就抬头朝春天走去吧！"
    }
  },
  {
    "slug": "student-008-session-03-a",
    "childSlug": "student-008",
    "title": "一天比一天好",
    "imageId": "growth-card-049",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "成长",
      "祝福"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "看电影",
      "message": "一天比一天好",
      "comment": "祝你永远鲜活，永远热烈且自由！"
    }
  },
  {
    "slug": "student-031-session-03-a",
    "childSlug": "student-031",
    "title": "毛笔与心理课",
    "imageId": "growth-card-050",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "心理课",
      "努力"
    ],
    "transcriptionNotes": [
      "最开心字段整行无法可靠辨认"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "毛笔、心理课",
      "happiest": "",
      "message": "我可以加油了",
      "comment": "这几天夏令营辛苦啦~以后也要继续努力！心中有光，脚步所向披靡"
    }
  },
  {
    "slug": "student-036-session-03-a",
    "childSlug": "student-036",
    "title": "看电影",
    "imageId": "growth-card-051",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "情绪",
      "电影",
      "感受",
      "休息",
      "鼓励"
    ],
    "transcriptionNotes": [
      "学会字段有涂改，仅保留可确认词组"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "心情、看电影和感受",
      "happiest": "看电影",
      "message": "明天好好休息",
      "comment": "这几天夏令营辛苦啦~老师觉得你很听话哦，特别棒^^相信你的未来能够灿烂精彩！心中有光，脚步所向披靡！"
    }
  },
  {
    "slug": "student-032-session-03-a",
    "childSlug": "student-032",
    "title": "坚持下去",
    "imageId": "growth-card-052",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "坚持",
      "自我提升"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写规范毛笔字",
      "happiest": "看电影",
      "message": "一定要坚持下去，相信我越来越提升上去",
      "comment": "加油！！老师相信你会越来越好的~其实你现在就很棒哦，老师觉得你很乖。心中有光，脚步所向披靡！"
    }
  },
  {
    "slug": "student-022-session-03-a",
    "childSlug": "student-022",
    "title": "成为更好的自己",
    "imageId": "growth-card-053",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪",
      "进步",
      "自我成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "毛笔字、心理情绪。",
      "happiest": "我学会用毛笔写字。",
      "message": "只要进步，才能成为更好的自己。",
      "comment": "这几天夏令营辛苦啦~我们可爱又乖巧的莉蓉，以后也要继续加油！心中有光，脚步所向披靡！"
    }
  },
  {
    "slug": "student-033-session-03-a",
    "childSlug": "student-033",
    "title": "收获颇丰",
    "imageId": "growth-card-054",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪管理",
      "电影",
      "收获",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字，管理心情。",
      "happiest": "看电影。",
      "message": "明天开心67。",
      "comment": "67是谁呢？好奇妙哦~今天真是收获颇丰的一天，也是开心的一天，明天我们会经历不同的事情，也会一样开心哦！"
    }
  },
  {
    "slug": "student-021-session-03-a",
    "childSlug": "student-021",
    "title": "更懂事",
    "imageId": "growth-card-055",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "心理",
      "快乐",
      "懂事",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何控制心理",
      "happiest": "又过了愉快的一天。",
      "message": "要更懂事。",
      "comment": "愉快的一天总是过得飞快，不知不觉间，曾经天真的小孩就长成了懂事的大孩子~未来的你一定会更加闪闪发光！"
    }
  },
  {
    "slug": "student-017-session-03-a",
    "childSlug": "student-017",
    "title": "求知欲旺盛",
    "imageId": "growth-card-056",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "控怒",
      "情绪管理",
      "电影",
      "求知欲"
    ],
    "transcriptionNotes": [
      "教师评语中段连接字迹不清，仅保留两端可确认句段"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "学会了控怒，如何管理自己的情绪。",
      "happiest": "下午看电影很有趣",
      "message": "希望明天能学到很多知识",
      "comment": "求知欲旺盛的小艺，老师很喜欢~"
    }
  },
  {
    "slug": "student-001-session-03-a",
    "childSlug": "student-001",
    "title": "收获满满",
    "imageId": "growth-card-057",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪调节",
      "知识",
      "自我鼓励"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字，去调整情绪。",
      "happiest": "学会了很多知识",
      "message": "继续加油！",
      "comment": "今天真是收获满满的一天！老师觉得你的毛笔字非常有性格，很帅气~一起加油，成为更好的自己！"
    }
  },
  {
    "slug": "student-007-session-03-a",
    "childSlug": "student-007",
    "title": "和老师聊天",
    "imageId": "growth-card-058",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "手工",
      "游戏",
      "钢琴",
      "师生互动",
      "努力"
    ],
    "transcriptionNotes": [
      "给明天的话末尾另有无法确认字词"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做手工、各种手工游戏、和钢琴",
      "happiest": "是和老师们聊天、玩。",
      "message": "要更加努力，更进一步",
      "comment": "你像一只活泼好动的小猴子，每节下课，到处都少不了你的身影。未来要像你说的那样更加努力哦，老师等着你的好消息！"
    }
  },
  {
    "slug": "student-003-session-03-a",
    "childSlug": "student-003",
    "title": "电影印象",
    "imageId": "growth-card-059",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "回忆"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "看电影",
      "message": "不用来了",
      "comment": "哈哈哈，看来电影给你的印象非常深刻了！明天在家的时光，你是怎么回想这夏令营的点滴，或者电影的情节呢？"
    }
  },
  {
    "slug": "student-019-session-03-a",
    "childSlug": "student-019",
    "title": "天天开心",
    "imageId": "growth-card-060",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "快乐",
      "祝福"
    ],
    "transcriptionNotes": [
      "原卡确写“毛笔淡字”，按原文保留"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了写毛笔淡字。",
      "happiest": "下午第一节课我们看了电影。",
      "message": "祝我们要天天开心、快快乐乐。",
      "comment": "是滴，开心最重要！要快快乐乐地长大哦~老师期待看到你未来阳光灿烂的模样！"
    }
  },
  {
    "slug": "student-010-session-01-a",
    "childSlug": "student-010",
    "title": "玩魔方，和老师互动",
    "imageId": "growth-card-061",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "师生互动",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "玩魔方",
      "happiest": "和老师互动",
      "message": "这段有趣的时光结束了",
      "comment": "好好吃饭，好好睡觉，好好长大。这个精彩的世界仅仅只对你们展开了一角，我们期待未来在更大的舞台看到你们！"
    }
  },
  {
    "slug": "student-007-session-01-a",
    "childSlug": "student-007",
    "title": "手工、魔方和风筝",
    "imageId": "growth-card-062",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "手工",
      "魔方",
      "风筝",
      "师生互动"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做手工和魔方，做风筝",
      "happiest": "和老师们聊天、互动",
      "message": "能和老师更能亲近一点",
      "comment": "随时欢迎，请多来找老师们说话，你真的很可爱呢。希望我们能成为好朋友！"
    }
  },
  {
    "slug": "student-009-session-01-a",
    "childSlug": "student-009",
    "title": "茉莉花与魔方",
    "imageId": "growth-card-063",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "师生互动"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱茉莉花、快速转魔方",
      "happiest": "和老师聊天",
      "message": "加油才会有奖励",
      "comment": "我喜欢你！送给我巧克力的好宝宝！我下次一定好好吃完。原谅我好吗？一粒粒橙"
    }
  },
  {
    "slug": "student-002-session-01-a",
    "childSlug": "student-002",
    "title": "茉莉花与魔方",
    "imageId": "growth-card-064",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "魔术",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "茉莉花的这首歌曲，学会了如何修复一个魔方",
      "happiest": "学会了一个魔术",
      "message": "好好学习天天向上",
      "comment": "看到你很认真的唱歌了！超级棒呀！下次多来找我聊天！一粒粒橙"
    }
  },
  {
    "slug": "student-037-session-01-a",
    "childSlug": "student-037",
    "title": "快速魔方与运动会",
    "imageId": "growth-card-065",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会"
    ],
    "transcriptionNotes": [
      "给明天的话前半疑似另有三字，教师评语正文也有潦草字迹，均未补猜"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "快速魔方的一些步骤",
      "happiest": "他们又给我们举办了运动会",
      "message": "加油",
      "comment": ""
    }
  },
  {
    "slug": "student-031-session-01-a",
    "childSlug": "student-031",
    "title": "唱茉莉花，还原魔方",
    "imageId": "growth-card-066",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "1.会唱茉莉花 2.会如何还原魔方",
      "happiest": "我学会唱茉莉花",
      "message": "快乐是免费的！每天都要开心！",
      "comment": "你们唱的茉莉花好好听！未来也好好唱！自己收拾碗筷，勤劳的好孩子！"
    }
  },
  {
    "slug": "student-017-session-01-a",
    "childSlug": "student-017",
    "title": "合唱、魔方与运动",
    "imageId": "growth-card-067",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "趣味运动会",
      "求知"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了唱茉莉花，还了解了江苏民歌，在老师的帮助下快速还原了我的思维力魔方，但是发现魔方对于我来说很困难。",
      "happiest": "下午的运动会使我感到开心、快乐和有趣。",
      "message": "希望明天能学到更多知识，接触一些新鲜事物。",
      "comment": "下次我们一起去操场打篮球！听说你很厉害！可以教我吗？"
    }
  },
  {
    "slug": "student-021-session-01-a",
    "childSlug": "student-021",
    "title": "魔方与勇敢",
    "imageId": "growth-card-068",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "勇敢"
    ],
    "transcriptionNotes": [
      "最开心字段句首有涂改，仅保留可确认部分"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "让我学会了玩魔方。",
      "happiest": "玩了一整天",
      "message": "度过一天，勇敢就上升3点。",
      "comment": "和你打球很开心呀！今天放学要不要一起打？"
    }
  },
  {
    "slug": "student-034-session-01-a",
    "childSlug": "student-034",
    "title": "复原魔方，参加合唱团",
    "imageId": "growth-card-069",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "合唱",
      "坚持"
    ],
    "transcriptionNotes": [
      "最开心字段前半及教师评语无法可靠逐字确认"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何复原魔方的教程，学会唱茉莉花加入合唱团。",
      "happiest": "我并复原了魔方",
      "message": "加油，努力就算发生不开心的事也要努力。",
      "comment": ""
    }
  },
  {
    "slug": "student-038-session-01-a",
    "childSlug": "student-038",
    "title": "茉莉花、魔方与篮球",
    "imageId": "growth-card-070",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "篮球",
      "足球",
      "坚持"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱茉莉花和还原魔方",
      "happiest": "打篮球和踢足球",
      "message": "一定要坚持住。",
      "comment": "一般是很困难或不喜欢的事我们才说“坚持”。难道来夏令营不是很快乐很好玩的事吗？多来找我玩呀？"
    }
  },
  {
    "slug": "student-018-session-01-a",
    "childSlug": "student-018",
    "title": "茉莉花、魔方与风筝",
    "imageId": "growth-card-071",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "风筝",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱茉莉花，和复原魔方。",
      "happiest": "下午我们放风筝",
      "message": "今天的努力，成就明天的自己。",
      "comment": "是的！每天进步一点点！风筝飞得高高呀！"
    }
  },
  {
    "slug": "student-024-session-01-a",
    "childSlug": "student-024",
    "title": "唱歌、魔方与游戏",
    "imageId": "growth-card-072",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "游戏",
      "求知"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱《茉莉花》，玩魔方",
      "happiest": "下午时玩游戏",
      "message": "学会更多知识",
      "comment": "和你们玩游戏我也很开心！"
    }
  },
  {
    "slug": "student-036-session-01-a",
    "childSlug": "student-036",
    "title": "茉莉花与魔方",
    "imageId": "growth-card-073",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "求知"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱茉莉花、魔方",
      "happiest": "玩魔方",
      "message": "学到更多知识和技能",
      "comment": "其实也不用一定会特别多技巧，好好享受夏令营的每一天都可以哇！天天开心！！"
    }
  },
  {
    "slug": "student-013-session-01-a",
    "childSlug": "student-013",
    "title": "合唱、魔方与运动会",
    "imageId": "growth-card-074",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "趣味运动会",
      "友谊",
      "珍惜"
    ],
    "transcriptionNotes": [
      "教师评语只保留可确认片段，中间及末尾有淡色连笔未补猜"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "上午合唱、魔方，下午呼啦圈、纸牌、尖叫鸡、赛跑",
      "happiest": "和老师交流、玩游戏、拍照",
      "message": "珍惜每一天，珍惜每一次相遇",
      "comment": "不放弃你心底最明亮的理想和愿望，做一个内心细腻的小孩。有天都会被你的细心感动。"
    }
  },
  {
    "slug": "student-012-session-01-a",
    "childSlug": "student-012",
    "title": "魔方、钢琴与乒乓球",
    "imageId": "growth-card-075",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "钢琴",
      "乒乓球",
      "进步"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何玩魔方",
      "happiest": "弹钢琴",
      "message": "加油，你会更棒",
      "comment": "希望你能继续精进你的魔方和钢琴琴技，跟你打乒乓球非常开心。你一定会更棒的！PS：你有自己的思考，继续保持！"
    }
  },
  {
    "slug": "student-035-session-01-a",
    "childSlug": "student-035",
    "title": "魔方与运动会",
    "imageId": "growth-card-076",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "玩魔方",
      "happiest": "操场活动",
      "message": "要学习得更努力",
      "comment": "表现很棒，继续加油！"
    }
  },
  {
    "slug": "student-006-session-01-a",
    "childSlug": "student-006",
    "title": "魔方、合唱与勇气",
    "imageId": "growth-card-077",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "合唱",
      "趣味运动会",
      "勇气"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "玩魔方、合唱",
      "happiest": "运动会",
      "message": "别焦虑，大胆往前走，今天的努力，明天一定有收获",
      "comment": "你说的对！不要对前方未知的事又焦虑恐惧，不要预先焦虑，你只管大胆往前走。"
    }
  },
  {
    "slug": "student-022-session-01-a",
    "childSlug": "student-022",
    "title": "魔方、唱歌与互动",
    "imageId": "growth-card-078",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "合唱",
      "师生互动",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "魔方、唱歌",
      "happiest": "和老师互动",
      "message": "每天进步",
      "comment": "你说的对！一天进步一点就好，一天的进步累积，你一定未来可期！"
    }
  },
  {
    "slug": "student-029-session-01-a",
    "childSlug": "student-029",
    "title": "还原魔方",
    "imageId": "growth-card-079",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "运动会",
      "message": "比昨天更厉害",
      "comment": "你说的对！真正的高贵，是优于过去的自己。"
    }
  },
  {
    "slug": "student-015-session-01-a",
    "childSlug": "student-015",
    "title": "唱歌和魔方",
    "imageId": "growth-card-080",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱歌、魔方",
      "happiest": "魔方、唱歌",
      "message": "希望可以开心",
      "comment": "表现很棒！让自己开心每一天就好～"
    }
  },
  {
    "slug": "student-028-session-01-a",
    "childSlug": "student-028",
    "title": "还原魔方与运动会",
    "imageId": "growth-card-081",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "专注"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "运动会游戏",
      "message": "专心听课，开心",
      "comment": "表现很棒！继续加油。"
    }
  },
  {
    "slug": "student-033-session-01-a",
    "childSlug": "student-033",
    "title": "合唱与魔方",
    "imageId": "growth-card-082",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "合唱、玩魔方",
      "happiest": "",
      "message": "快乐学习",
      "comment": "表现很棒！继续加油。"
    }
  },
  {
    "slug": "student-019-session-01-a",
    "childSlug": "student-019",
    "title": "还原魔方与勇气",
    "imageId": "growth-card-083",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "勇气"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "运动会",
      "message": "不要放弃想做的事情，要勇敢去做",
      "comment": "会玩魔方会让人变聪明哦！继续加油！"
    }
  },
  {
    "slug": "student-003-session-01-a",
    "childSlug": "student-003",
    "title": "茉莉花与运动会",
    "imageId": "growth-card-084",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "趣味运动会"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱茉莉花",
      "happiest": "运动会",
      "message": "明天上课累了",
      "comment": "拿到多少名都很不错的，你们玩得开心、吃得开心，老师们也很开心了。"
    }
  },
  {
    "slug": "student-020-session-01-a",
    "childSlug": "student-020",
    "title": "魔方、唱歌与运动会",
    "imageId": "growth-card-085",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "合唱",
      "趣味运动会",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "玩魔方、唱歌",
      "happiest": "下午的运动会",
      "message": "每天开心，成为更好的自己",
      "comment": "希望你能天天开心哦！你一直都是我们几个老师很喜欢的小活宝。"
    }
  },
  {
    "slug": "student-011-session-01-a",
    "childSlug": "student-011",
    "title": "电子琴、篮球与运动会",
    "imageId": "growth-card-086",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "趣味运动会",
      "篮球",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "今天我学会了弹奏电子琴",
      "happiest": "我最开心的是今天下午的运动会",
      "message": "我想对明天的我说我一定要每天开心",
      "comment": "你篮球打得特别特别好，和你还有你的两个妹妹都玩得很开心！不要忘记我给你变的魔术哦！"
    }
  },
  {
    "slug": "student-005-session-01-a",
    "childSlug": "student-005",
    "title": "魔方、同伴与专心",
    "imageId": "growth-card-087",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "同伴",
      "专注"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "吃冰淇淋、和同学玩",
      "message": "明天更开心，更专心",
      "comment": "等你学会复原魔方后，班里同学的魔方都靠你来复原咯！"
    }
  },
  {
    "slug": "student-008-session-01-a",
    "childSlug": "student-008",
    "title": "还原魔方与活力",
    "imageId": "growth-card-088",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "趣味运动会",
      "活力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "运动会",
      "message": "让明天更有趣",
      "comment": "老师也想像你一样每天这么有精力，你是怎么做到的？"
    }
  },
  {
    "slug": "student-014-session-01-a",
    "childSlug": "student-014",
    "title": "合唱、魔方与快乐",
    "imageId": "growth-card-089",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "合唱",
      "魔方",
      "趣味运动会",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "唱歌、还原魔方",
      "happiest": "运动会得了第二名",
      "message": "明天即使有伤心的事也要开心",
      "comment": "你真的很棒耶！大部分同学都走了，你们还愿意主动帮老师一起收拾，谢谢你！"
    }
  },
  {
    "slug": "student-027-session-01-a",
    "childSlug": "student-027",
    "title": "还原魔方与唱歌",
    "imageId": "growth-card-090",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "合唱",
      "坚持"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "学会唱歌",
      "message": "继续加油",
      "comment": "明天的你唱歌一定会比今天更好听哦！"
    }
  },
  {
    "slug": "student-026-session-01-a",
    "childSlug": "student-026",
    "title": "魔方与朋友",
    "imageId": "growth-card-091",
    "dateLabel": "7月16日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 1,
    "themes": [
      "魔方",
      "友谊"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "还原魔方",
      "happiest": "和朋友在一起",
      "message": "明天加油",
      "comment": "朋友总是能给我们带来许许多多的幸福。"
    }
  },
  {
    "slug": "student-027-session-02-a",
    "childSlug": "student-027",
    "title": "做书",
    "imageId": "growth-card-092",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书",
      "happiest": "学会做事",
      "message": "加油",
      "comment": "哈哈，我们一起加油打气！！！争取成为更好的自己。"
    }
  },
  {
    "slug": "student-031-session-02-a",
    "childSlug": "student-031",
    "title": "做书与画画",
    "imageId": "growth-card-093",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "绘画",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书",
      "happiest": "画画",
      "message": "每天要开心",
      "comment": "老师也希望你天天开心。如果你想继续画，可以来找老师拿材料哦，老师期待你的画作！"
    }
  },
  {
    "slug": "student-022-session-02-a",
    "childSlug": "student-022",
    "title": "民族文化与南京大学",
    "imageId": "growth-card-094",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "民族文化",
      "南京大学",
      "师生互动",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "民族文化分享，介绍南京大学",
      "happiest": "和老师互动",
      "message": "只要进步才能成为更好的自己",
      "comment": "好滴，希望我们能够多多相处，一起共同进步，希望未来越来越好！"
    }
  },
  {
    "slug": "student-020-session-02-a",
    "childSlug": "student-020",
    "title": "民族文化、实验与做书",
    "imageId": "growth-card-095",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "民族文化",
      "科学实验",
      "小书制作",
      "南京大学"
    ],
    "transcriptionNotes": [
      "教师评语开头另有一短句，连笔无法确认"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "民族语、科学小实验、做书",
      "happiest": "认识南京大学",
      "message": "做好每一天的自己",
      "comment": "没错，做好自己就好了，相信你一定能行。"
    }
  },
  {
    "slug": "student-037-session-02-a",
    "childSlug": "student-037",
    "title": "做小书本",
    "imageId": "growth-card-096",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做小书本",
      "happiest": "学会做小书",
      "message": "一定要更好",
      "comment": "每天的你也很棒啦。真是一个有灵气和上进心的小女孩，老师相信你会做得更好！"
    }
  },
  {
    "slug": "student-008-session-02-a",
    "childSlug": "student-008",
    "title": "制作小书与篮球",
    "imageId": "growth-card-097",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "篮球",
      "师生互动",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "制作小书",
      "happiest": "和老师打篮球",
      "message": "一天比一天好",
      "comment": "谢谢你们送给老师们一场美好的盛夏！"
    }
  },
  {
    "slug": "student-021-session-02-a",
    "childSlug": "student-021",
    "title": "南京大学与绘本",
    "imageId": "growth-card-098",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "南京大学",
      "小书制作",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "南京大学的历史、会做绘本",
      "happiest": "学会制作",
      "message": "让我明天更懂事",
      "comment": "花会沿路盛开，你以后的路也是！"
    }
  },
  {
    "slug": "student-029-session-02-a",
    "childSlug": "student-029",
    "title": "一张纸做成一本书",
    "imageId": "growth-card-099",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "科学实验",
      "自信"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "一张纸做成一本书",
      "happiest": "科学实验",
      "message": "加油！我一定会厉害。会的",
      "comment": "要好好长大！期待你的未来能成为灰常厉害的人！"
    }
  },
  {
    "slug": "student-035-session-02-a",
    "childSlug": "student-035",
    "title": "做小书与民族知识",
    "imageId": "growth-card-100",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "民族文化",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做小书",
      "happiest": "知道很多民族",
      "message": "要学习得很好",
      "comment": "每天进步一点点，日积月累，就是大大的了不起！"
    }
  },
  {
    "slug": "student-003-session-02-a",
    "childSlug": "student-003",
    "title": "南京大学的历史",
    "imageId": "growth-card-101",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "南京大学",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "南大历史",
      "happiest": "下课",
      "message": "别说了",
      "comment": "老师有点点受伤！！成长的收获不一定在书本里，希望你的未来一路惊喜。"
    }
  },
  {
    "slug": "student-001-session-02-a",
    "childSlug": "student-001",
    "title": "民族分享、合唱与魔方",
    "imageId": "growth-card-102",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "民族文化",
      "合唱",
      "魔方",
      "专注"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "民族分享、唱歌、复原魔方、翻牌",
      "happiest": "所有都很开心",
      "message": "专心听课",
      "comment": "加油！可以尝试继续学习唱歌、玩魔方，在科学的大道上一步一步往前走。你乒乓球打得真的非常好。PS：你很有主见、很努力，点赞！"
    }
  },
  {
    "slug": "student-030-session-02-a",
    "childSlug": "student-030",
    "title": "做书与科学实验",
    "imageId": "growth-card-103",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "科学实验"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书",
      "happiest": "科学实验",
      "message": "加油",
      "comment": "很高兴认识你！希望以后能和我多多聊天，不要害羞呀！我超喜欢你！感觉你去了很多地方旅游，一定要去更远的地方看世界呀！"
    }
  },
  {
    "slug": "student-011-session-02-a",
    "childSlug": "student-011",
    "title": "做书与篮球",
    "imageId": "growth-card-104",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "篮球",
      "手工"
    ],
    "transcriptionNotes": [
      "教师评语中一处连笔短语未录入"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书",
      "happiest": "和老师打篮球",
      "message": "明天手工课要做好",
      "comment": "海霞和妹妹们都特别可爱，和我们一起玩，感觉好幸福呀！放学接着打篮球呀！"
    }
  },
  {
    "slug": "student-002-session-02-a",
    "childSlug": "student-002",
    "title": "南京大学与民族文化",
    "imageId": "growth-card-105",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "南京大学",
      "民族文化",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "南京大学的历史、民族的文化",
      "happiest": "学到很多",
      "message": "加油，好好向上",
      "comment": "加油！Fighting！努力！我看好你哦，美丽的小女孩～"
    }
  },
  {
    "slug": "student-005-session-02-a",
    "childSlug": "student-005",
    "title": "一本小书与篮球",
    "imageId": "growth-card-106",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "篮球",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做一本小书",
      "happiest": "打篮球",
      "message": "明天会更好，明天更开心",
      "comment": "明天会更好呀！"
    }
  },
  {
    "slug": "student-023-session-02-a",
    "childSlug": "student-023",
    "title": "做小书",
    "imageId": "growth-card-107",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做小书",
      "happiest": "姐姐给了我一块钱",
      "message": "继续加油",
      "comment": "每天都要加油哦！"
    }
  },
  {
    "slug": "student-013-session-02-a",
    "childSlug": "student-013",
    "title": "各种各样的知识",
    "imageId": "growth-card-108",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "学习",
      "师生情谊",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "各种各样的知识",
      "happiest": "给小林老师送书",
      "message": "做好自己，天天向上",
      "comment": "希望你能和小林老师一直保持联系呀！"
    }
  },
  {
    "slug": "student-034-session-02-a",
    "childSlug": "student-034",
    "title": "和老师做科学实验",
    "imageId": "growth-card-109",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "科学实验",
      "师生互动",
      "珍惜"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做实验",
      "happiest": "和老师们一起做科学实验",
      "message": "加油，珍惜每一天",
      "comment": "好好珍惜每一天吧！"
    }
  },
  {
    "slug": "student-018-session-02-a",
    "childSlug": "student-018",
    "title": "用一张A4纸做书",
    "imageId": "growth-card-110",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "创作",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "用一张A4纸做书",
      "happiest": "做了一本名叫《常青》的书",
      "message": "今天的努力，成就明天的自己",
      "comment": "希望你的进取之心也能保持常青，真正的高贵，是优于过去的自己。"
    }
  },
  {
    "slug": "student-033-session-02-a",
    "childSlug": "student-033",
    "title": "纸书、大学与民族",
    "imageId": "growth-card-111",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "南京大学",
      "科学实验",
      "民族文化",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "怎么用纸做成书，南京大学历史知识，实验，少数民族",
      "happiest": "下课玩",
      "message": "多开心，努力",
      "comment": "表现很棒，继续加油！"
    }
  },
  {
    "slug": "student-036-session-02-a",
    "childSlug": "student-036",
    "title": "一本书的结构",
    "imageId": "growth-card-112",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "南京大学",
      "小书制作",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "南京大学历史介绍，一本书的主要结构",
      "happiest": "我制作了一本书",
      "message": "好好学知识",
      "comment": "学会制作一本书非常棒！好好学知识，或许你以后能真正出版自己的书。"
    }
  },
  {
    "slug": "student-014-session-03-b",
    "childSlug": "student-014",
    "title": "一本好看的小书",
    "imageId": "growth-card-113",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "小书制作",
      "科学实验",
      "南京大学",
      "快乐"
    ],
    "transcriptionNotes": [
      "原卡日期为7月18日"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "用A4纸做书，还了解了南京大学",
      "happiest": "今天我做了一本书，老师夸奖我做得很好看",
      "message": "开心",
      "comment": "你做的书非常好看！专心学习，继续加油。"
    }
  },
  {
    "slug": "student-015-session-02-a",
    "childSlug": "student-015",
    "title": "用A4纸做一本书",
    "imageId": "growth-card-114",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "科学实验",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "用A4纸做一本书，和做实验",
      "happiest": "用A4纸做一本书",
      "message": "每天开心",
      "comment": "学会制作一本书非常棒，继续加油！"
    }
  },
  {
    "slug": "student-017-session-02-a",
    "childSlug": "student-017",
    "title": "民族、南大历史与做书",
    "imageId": "growth-card-115",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "民族文化",
      "南京大学",
      "小书制作",
      "绘画",
      "篮球"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "少数民族的传统节日，南京大学的历史，怎样做书",
      "happiest": "在第一节课上，把书上涂满颜料，切五彩纸",
      "message": "希望自己以认真的态度对待老师布置的任务，并能从其中找到乐趣",
      "comment": "你说得对！认认真真完成每一次任务，你一定能在其中发现乐趣！PS：你篮球打得很好，能看出来你很想打得更好，加油！"
    }
  },
  {
    "slug": "student-024-session-02-a",
    "childSlug": "student-024",
    "title": "摩擦力与灭火",
    "imageId": "growth-card-116",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "科学实验",
      "摩擦力",
      "灭火",
      "求知"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "摩擦力的知识，灭火的方法",
      "happiest": "上实验课",
      "message": "学到更多知识",
      "comment": "多学科学知识，多动手做实验，非常棒！"
    }
  },
  {
    "slug": "student-039-session-02-a",
    "childSlug": "student-039",
    "title": "民族知识与手工",
    "imageId": "growth-card-117",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "民族文化",
      "手工",
      "风车",
      "坚持"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "中国有56个民族和55个少数民族，还学会了做手工",
      "happiest": "做风车",
      "message": "你一定要坚持下去，还要让成绩变好",
      "comment": "爱做手工非常棒，心灵手巧，坚持是最重要的！"
    }
  },
  {
    "slug": "student-026-session-02-a",
    "childSlug": "student-026",
    "title": "做书与新知识",
    "imageId": "growth-card-118",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "小书制作",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做书",
      "happiest": "学了很多的东西",
      "message": "无",
      "comment": "多学知识和技能，继续加油！"
    }
  },
  {
    "slug": "student-009-session-01-b",
    "childSlug": "student-009",
    "title": "第一次尝试的新鲜收获",
    "imageId": "growth-card-119",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "风筝",
      "经典阅读",
      "思考",
      "尝试"
    ],
    "transcriptionNotes": [
      "“制作了”与“的风筝”之间有两字未能可靠辨认，正文只保留确认部分"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我学会了我之前从未见过的钢琴，制作了风筝，学到了什么是经典，哪些才属于经典，也通过思考得到了奖励。\n\n老师：好厉害，还获得了奖励，希望你能一直保持积极乐观的心态，从学习中收获成长，再创更美好的未来。"
  },
  {
    "slug": "student-040-session-01-a",
    "childSlug": "student-040",
    "title": "风筝、AI与经典导引",
    "imageId": "growth-card-120",
    "dateLabel": "2024年7月15日",
    "recordedOn": "2024-07-15",
    "dateConfidence": "exact",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "AI",
      "钢琴",
      "经典阅读",
      "收获"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我的收获：我还知道了风筝该怎么做，什么是AI，学会弹钢琴，经典导引让我知道非常非常多的书。\n\n老师：看来你收获很多啊。其实在和你相处的时候，我也仿佛看到了小时候的自己，所以，老师希望你天天开心，梦想成真！！！"
  },
  {
    "slug": "student-035-session-01-b",
    "childSlug": "student-035",
    "title": "四门课里的动手与新知",
    "imageId": "growth-card-121",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "风筝",
      "AI",
      "经典阅读",
      "快乐"
    ],
    "transcriptionNotes": [
      "第2点原卡确写“手段锻炼了动手能力”，按原文保留"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：1.我觉得今天的钢琴课非常有趣，我还把以前忘记的又学回来了。2.我还觉得风筝课让我们手段锻炼了动手能力，也很有趣。3.AI课让我们学习了怎么使用AI。4.经典的学习也让我们认识了什么是经典，怎么去理解经典）。我非常开心😊！\n\n老师：哇塞！我也想和你们一起上课。（开玩笑的啦）希望我们的课程不仅能让你们学到知识，也能让你们保持开心。^^！！"
  },
  {
    "slug": "student-018-session-01-b",
    "childSlug": "student-018",
    "title": "会弹小星星，也会观察课堂",
    "imageId": "growth-card-122",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "经典阅读",
      "阅读意义",
      "课堂观察",
      "反思"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：通过今天的体验，我收获了很多：学会用电子琴弹小星星，认识了什么是经典，为什么要读书等。我觉得需要改进的地方有：课堂秩序稍微乱，小话声不停。学生有时会不遵从老师命令。其他地方都很好，只是以上两点，有待改进。\n\n老师：你是一个非常具有班级责任感的女孩，也非常有自己的想法！很开心今天的课程带给你收获，期待以后聊天能拥有更多美好的课程体验～"
  },
  {
    "slug": "student-028-session-01-b",
    "childSlug": "student-028",
    "title": "风筝、AI与电子琴",
    "imageId": "growth-card-123",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "AI",
      "钢琴",
      "阅读",
      "收获"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我学会了做风筝，认识了风筝制作的过程，我认识了AI的效能，我学会了电子琴认识了很多图书。\n\n老师：今天真是收获满满的一天！期待你继续加油，继续进步～"
  },
  {
    "slug": "student-017-session-01-b",
    "childSlug": "student-017",
    "title": "传统与新知碰撞的一天",
    "imageId": "growth-card-124",
    "dateLabel": "2026年7月14日",
    "recordedOn": "2026-07-14",
    "dateConfidence": "exact",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "非遗文化",
      "AI",
      "钢琴",
      "经典阅读",
      "成就感",
      "表达"
    ],
    "transcriptionNotes": [
      "原卡确写“老师您们”“令我喜欢最的一部”和“鲜新事物”，按原文保留；原卡双长横标点已规范为冒号"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今日之感受\n首先，今日早上是我第一次来上课，很高兴能遇到老师您们。在今天第一、二节课中我们学习了非遗文化纸鸢的历史课程，并参与到制作风筝中。在风筝制作过程中，使我对中国非遗文化纸鸢的制作有了深刻的理解。令我喜欢最的一部便是：手绘风筝。其中我手绘的图案是猫头鹰，我拿着亲手做的风筝跑到教学楼前，这时我感受到非遗文化的魅力；然后，我们认识了一些AI智能的知识，使我认识到了生活里处处是AI，我感受到了科技的发达和魅力，我还想探索更多关于AI的奥妙；其次，在音乐课上老师教我们弹奏当我完整弹完右手部分的曲子时，我觉得特别有成就感；再其次，今天我知道了什么是“经典”，经典就是流传很久需要反复阅读的书还知道了怎样读经典书，今天我们看了几个经典书的视频，虽然其中的内容我有些难理解，但是我觉得还有很好的收获；最后，老师的教学方法很独特，使我们了解到了些鲜新事物，老师们的课堂，调动了我们积极的思考问题，今天是令我收获满满和开心的一天！\n\n老师：第一天见到你，老师就被你丰富全面、排版工整的长篇记录吸引了，老师发现你有很多细腻的想法，也非常投入地上每一节课，好感动！期待明天你也能度过开心、有收获的一天！"
  },
  {
    "slug": "student-005-session-01-b",
    "childSlug": "student-005",
    "title": "开心很有分量",
    "imageId": "growth-card-125",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "快乐",
      "自我感受",
      "师生情"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我很开心，不用改进。\n\n老师：对我们的评价那么高呀？？确实，开心真的很重要。老师们也很开心，很高兴认识你。"
  },
  {
    "slug": "student-003-session-01-b",
    "childSlug": "student-003",
    "title": "动手、科技与经典",
    "imageId": "growth-card-126",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "AI",
      "钢琴",
      "经典阅读",
      "探索"
    ],
    "transcriptionNotes": [
      "教师评语首句后有一段连笔未能可靠辨认，正文只保留确认部分"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我学会了做风筝，知道了人工技术的强大，学会了用右手弹钢琴，还知道了阅读经典的重要性。\n\n老师：哇！你学到了好多新东西。希望你能带着这份探索求知的热情继续往前走，遇见更好的自己。"
  },
  {
    "slug": "student-001-session-01-a",
    "childSlug": "student-001",
    "title": "认识老师与新朋友",
    "imageId": "growth-card-127",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "相遇",
      "师生情",
      "快乐",
      "友谊"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今日感受。今日，我认识了一些老师；漂亮姐姐，帅气哥哥，认识他们，我很开心！在这里一期，让我们好好相处。\n\n老师：我们也很高兴认识你。帅气的小男孩。希望我们不只是你的老师，也是你的朋友哦。"
  },
  {
    "slug": "student-003-session-01-c",
    "childSlug": "student-003",
    "title": "AI智慧与小星星",
    "imageId": "growth-card-128",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "AI",
      "钢琴",
      "经典阅读",
      "共同成长"
    ],
    "transcriptionNotes": [
      "孩子正文“经典的”后四字未能可靠辨认，正文只保留确认部分；署名连笔未能单独逐字判断，归属沿用与标准卡的笔迹和批次交叉核对结果"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我昨天，学到了很多知识，AI的智慧，还学会了《小星星》这首歌的谱子，经典的。\n\n老师：真棒！那老师们和你们在一起也学到了很多，我们一起进步吧。^^"
  },
  {
    "slug": "student-025-session-01-a",
    "childSlug": "student-025",
    "title": "收获很多知识",
    "imageId": "growth-card-129",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "学习",
      "收获",
      "共同成长"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：收获了很多知识。\n\n老师：哈哈！很高兴你能从课堂里学到很多，希望我们一起继续努力。^^"
  },
  {
    "slug": "student-007-session-01-b",
    "childSlug": "student-007",
    "title": "扩大自己的世界观",
    "imageId": "growth-card-131",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "学习",
      "世界观",
      "成长"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：收获了很多的知识，也可以扩大自己的世界观。\n\n老师：老师非常开心，你能在今天的课堂有所收获；完善自己的世界观也需要我们不断地去阅读，了解新知识，期待你看到更大的世界！"
  },
  {
    "slug": "student-006-session-01-b",
    "childSlug": "student-006",
    "title": "趣味、动手与每天进步",
    "imageId": "growth-card-132",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "动手实践",
      "耐心",
      "AI",
      "阅读",
      "成长"
    ],
    "transcriptionNotes": [
      "原卡确写“拓木宽视野”，按原文保留"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今天的课堂生趣十足，动手创作锻炼了耐心；新科技知识拓木宽视野，文字阅读也滋养了内心；每一天都在进步。\n\n老师：内心有温柔，眼里有光，祝你获得更大的进步，让自己更坚实也更开放！"
  },
  {
    "slug": "student-019-session-01-b",
    "childSlug": "student-019",
    "title": "风筝、AI、音乐与经典",
    "imageId": "growth-card-133",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "AI",
      "音乐",
      "经典阅读",
      "动手实践"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：昨天的课堂中让我们感受到很多乐趣，风筝课让我们的动手能力增强，AI机器人让我们感受到AI的强大，音乐课让我们感受到音乐的乐趣，读经典让我们知道读经典的好处。\n\n老师：看来今天真是很有感想的一天！读书、弹琴、做手工、学科学，都让你收获满满，继续加油！"
  },
  {
    "slug": "student-029-session-01-b",
    "childSlug": "student-029",
    "title": "每天都充满开心",
    "imageId": "growth-card-134",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "AI",
      "快乐",
      "成长"
    ],
    "transcriptionNotes": [
      "教师评语中一个可爱昵称清楚度有限，正文未录入该昵称"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今天，我非常的开心！老师们不仅教我们怎样弹钢琴，还让我们知道什么是AI。每天都充满开心和快乐！\n\n老师：很开心看到你在短短几天的夏令营里有所收获！！也谢谢你陪老师度过如此有意义的几天～～希君生羽翼，一化北溟鱼。要好好长大呀！"
  },
  {
    "slug": "student-031-session-01-b",
    "childSlug": "student-031",
    "title": "不攀比，努力做好自己",
    "imageId": "growth-card-135",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "学习",
      "生命思考",
      "自我认同",
      "价值观"
    ],
    "transcriptionNotes": [
      "第3点“不攀比不”后有一字无法确认，正文省略该字并规范断句"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：这节课让我知道：1.我知道不管你是富人还是穷人都要努力地学习。2.我还知道在生命倒计时前要把自己所有的荣光和精彩展现出来。3.老师所讲给我们的人物先进故事都是希望我们做好自己，不攀比，努力学习。"
  },
  {
    "slug": "student-015-session-01-b",
    "childSlug": "student-015",
    "title": "风筝、小星星与AI",
    "imageId": "growth-card-137",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "钢琴",
      "AI",
      "成就感"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：这一天我学会了如何做风筝和在钢琴课学会了《小星星》很有成就感和AI大智能的神奇。\n\n老师：很开心看到你在短短几天的课程里有所收获！！老师也很有成就感嘿嘿～很高兴认识你呀！！老师对你印象很深刻呢。谢谢你陪老师度过如此有意义的夏令营，和老师一同成长^^ 希君生羽翼，一化北溟鱼。要好好长大哦！"
  },
  {
    "slug": "student-001-session-03-b",
    "childSlug": "student-001",
    "title": "民族服、化妆与继续阅读",
    "imageId": "growth-card-139",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "民族文化",
      "化妆",
      "阅读",
      "坚持"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "民族服，学会化妆。",
      "happiest": "看完了一本书",
      "message": "在明天继续看书",
      "comment": "PS：你的名字好好听，好特别！老师会一直记住的！^^ 很开心看到你在短短几天的课程里有所收获！阅读真的是一个很棒的习惯，它带我们见自己，见天地，见众生。老师真心希望你可以从中终生受益！最后，老师想送给你一句话：“希君生羽翼，一化北溟鱼。”加油吧！^^"
    }
  },
  {
    "slug": "student-037-session-01-b",
    "childSlug": "student-037",
    "title": "一张诚实的空白感想",
    "imageId": "growth-card-140",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "真实表达",
      "师生对话"
    ],
    "transcriptionNotes": [
      "教师评语句首五字无法可靠确认，正文只保留确认部分"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：没有感想。\n\n老师：后天就有感想了呢～^^"
  },
  {
    "slug": "student-021-session-01-b",
    "childSlug": "student-021",
    "title": "喜欢钢琴，也看见AI",
    "imageId": "growth-card-141",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "钢琴",
      "AI",
      "兴趣",
      "好奇心"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：很喜欢钢琴的我学会了。我感觉AI非常强大。\n\n老师：很开心看到你在短短几天的课程里学到了新东西！！这样老师的使命就算达成了^^ 老师很高兴认识你哦～你认真的样子，你和老师说话时可爱的笑颜，老师都会深深记在心里的！～希望你的眼里永远像现在这样充满光芒。希君生羽翼，一化北溟鱼。"
  },
  {
    "slug": "student-013-session-01-b",
    "childSlug": "student-013",
    "title": "传统与新知的碰撞",
    "imageId": "growth-card-142",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "非遗文化",
      "AI",
      "钢琴",
      "经典阅读",
      "珍惜"
    ],
    "transcriptionNotes": [
      "纸张底部仅有极淡透字，不作为正面教师评语转写"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今天的夏令营课程丰富多彩。非遗风筝课让我感受传统手艺的魅力，AI科普开拓了我的眼界，悠扬的钢琴声令人沉醉，经典研读课带给我领略文字的力量。传统与新知碰撞在一起，收获满满。我十分珍惜这次学习的机会，期待接下来更多有趣的课程。"
  },
  {
    "slug": "student-007-session-01-c",
    "childSlug": "student-007",
    "title": "温柔细致的课堂",
    "imageId": "growth-card-143",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "课堂感受",
      "动手实践",
      "师生情",
      "好奇心"
    ],
    "transcriptionNotes": [
      "孩子正文的“多”写在插入号下方，已按最终句序转写"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：To：\n段晨希：我感受到上课时老师们讲的很详细很温柔，那几节课我学会了很多不知道的东西，也让我的动手能力更好。\n\n老师：很开心看到你在短短几天里真的有所收获！！也谢谢你陪老师度过这么有意义的夏令营！你好可爱呀 TT 老师好喜欢你呀！！！“希君生羽翼，一化北溟鱼”要好好长大哦！♡♡"
  },
  {
    "slug": "student-008-session-01-b",
    "childSlug": "student-008",
    "title": "有趣，也有无聊",
    "imageId": "growth-card-144",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "真实表达",
      "音乐",
      "游戏",
      "课堂反思"
    ],
    "transcriptionNotes": [
      "首句“感觉”与“趣”之间一处重度涂黑，原字不可确认；末句原卡以拼音liáo插入“无”和“了”之间，按原文保留"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：我刚上前三节课感觉趣。最后一节也特别有趣玩了很多小游戏。下午第一节让我感受到音乐的天地。剩下的两节课我感觉很无liáo了。\n\n老师：是因为你没有认真听啦！！老师讲得这么好！！很开心看到你这几天玩得很开心！希望夏令营真的有给你带去收获！！谢谢你陪老师度过这么有意义的支教 TT 老师很喜欢你呀！！！我会永远记住你的！“希君生羽翼，一化北溟鱼”要好好长大哦～ ♡♡"
  },
  {
    "slug": "student-028-session-02-a",
    "childSlug": "student-028",
    "title": "科学实验",
    "imageId": "growth-card-145",
    "dateLabel": "7月17日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 2,
    "themes": [
      "科学实验",
      "快乐",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "学会了一些小实验",
      "happiest": "在科学室做实验",
      "message": "要开心的面对明天",
      "comment": "（每天都要！！）很开心看到你在短短几天里真的有所收获！！老师相信你以后一定可以在你感兴趣的领域大显身手的！谢谢你陪我们度过这么有意义的夏令营～“希君生羽翼，一化北溟鱼”"
    }
  },
  {
    "slug": "student-012-session-03-a",
    "childSlug": "student-012",
    "title": "实验与电子琴",
    "imageId": "growth-card-146",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "科学实验",
      "钢琴",
      "潜力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "做实验。",
      "happiest": "弹电子琴。",
      "message": "没实力。",
      "comment": "没实力？怎么会，我觉得你超有潜力，只要继续努力，肯定会更好。"
    }
  },
  {
    "slug": "student-009-session-03-a",
    "childSlug": "student-009",
    "title": "手工、南大与民族",
    "imageId": "growth-card-147",
    "dateLabel": "2027月18日（原卡如此）",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "手工",
      "南京大学",
      "民族文化",
      "快乐"
    ],
    "transcriptionNotes": [
      "日期栏连续写作“2027月18日”，年份只写到“202”"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "制作手工、南京大学历史、少数民族",
      "happiest": "制作手工",
      "message": "明天更开心",
      "comment": "Hi！！我又抽到你的啦，真是什么缘分呀！等我回去一定会天天想你的；我最爱雨桐！"
    }
  },
  {
    "slug": "student-020-session-01-b",
    "childSlug": "student-020",
    "title": "风筝、AI、乐谱与经典",
    "imageId": "growth-card-148",
    "dateLabel": "日期未填写",
    "recordedOn": null,
    "dateConfidence": "missing",
    "sessionOrder": 1,
    "themes": [
      "风筝",
      "AI",
      "音乐",
      "经典阅读",
      "好奇心"
    ],
    "transcriptionNotes": [
      "孩子正文“趣”字有重描，但可确认；教师笑脸符号转写为☺"
    ],
    "sourceKind": "freeform",
    "kind": "plain",
    "body": "孩子：今天让我感受了很多奇妙，风筝课让我增强了手动能力，AI机器人让我感受到了AI的强大，音乐课让我感受到了乐谱的奇妙，经典书让我感受到书的趣味。\n\n老师：很开心看到你在短短几天里真的有所收获！！你好可爱呀，老师好喜欢你☺谢谢你陪老师度过了这么有意义的夏令营～“希君生羽翼，一化北溟鱼”要好好长大哦！♡♡"
  },
  {
    "slug": "student-018-session-03-a",
    "childSlug": "student-018",
    "title": "书法与情绪管理",
    "imageId": "growth-card-150",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "情绪管理",
      "电影",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "更好的运用毛笔来写字，和管理情绪",
      "happiest": "下午我们看了一部非常好看的一部电影",
      "message": "今天的努力成就明天的自己。",
      "comment": "你是一个很优秀的小孩，老师们对你印象很深噢，祝愿你未来能成为更好的自己！！也谢谢你这段时间给予老师们的支持！"
    }
  },
  {
    "slug": "student-029-session-03-a",
    "childSlug": "student-029",
    "title": "写好毛笔字",
    "imageId": "growth-card-151",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "努力"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "正确的写毛笔字。",
      "happiest": "老师给我们放电影。",
      "message": "我要更加努力，更加变强。",
      "comment": "期待你的未来！Good good study！Day day up！好 好 学习！天 天 向上！送你一句恶搞的英语短句，不过寓意是好的hh。期待你的未来一路生花！"
    }
  },
  {
    "slug": "student-020-session-03-a",
    "childSlug": "student-020",
    "title": "毛笔字与电影",
    "imageId": "growth-card-152",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "心理调整",
      "电影",
      "成长"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "毛笔字、心理调整",
      "happiest": "看电影",
      "message": "过好每一天自己。",
      "comment": "乖巧的小雨涵一直都能给老师惊喜！相信认真、积极的你在未来一定会每天都开开心心，收获满满～"
    }
  },
  {
    "slug": "student-028-session-03-a",
    "childSlug": "student-028",
    "title": "写字与电影",
    "imageId": "growth-card-153",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "快乐"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "我学会了写毛笔字",
      "happiest": "看电影里面的内容",
      "message": "要开心的面对明天",
      "comment": "不仅明天，我们每天都要开心哦！"
    }
  },
  {
    "slug": "student-012-session-03-b",
    "childSlug": "student-012",
    "title": "弹钢琴",
    "imageId": "growth-card-154",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "钢琴",
      "热爱"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "弹奏钢琴",
      "happiest": "弹钢琴",
      "message": "弹钢琴",
      "comment": "这么喜欢弹钢琴呀～老师相信你只要坚持这份热爱，一定可以有所成就！心中有光，就能所向披靡！"
    }
  },
  {
    "slug": "student-016-session-03-a",
    "childSlug": "student-016",
    "title": "管理心情",
    "imageId": "growth-card-155",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "情绪管理",
      "电影",
      "成长"
    ],
    "transcriptionNotes": [
      "学会字段中间有重度涂改，正文仅保留可确认部分"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "如何管理心情",
      "happiest": "看电影",
      "message": "一定会更好",
      "comment": "每天都有新收获，太棒啦～以后也要继续加油哦！心中有光，就能所向披靡！"
    }
  },
  {
    "slug": "student-040-session-03-a",
    "childSlug": "student-040",
    "title": "毛笔书写",
    "imageId": "growth-card-156",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "勇气",
      "师生情"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "学会、写毛笔。",
      "happiest": "写毛笔",
      "message": "妍姐明天不要紧张",
      "comment": "别紧张呀^^期待见到你！（超绝）明天见！后天见！我们妍姐书法一流！（认可jpg.）。这几天夏令营玩得很开心！谢谢你给我们带来很多欢乐，陪我们度过超有意义的日子！我们妍姐以后肯定会有灿烂明媚的人生哒..心中有光，就能所向披靡！"
    }
  },
  {
    "slug": "student-013-session-03-a",
    "childSlug": "student-013",
    "title": "毛笔字与做自己",
    "imageId": "growth-card-157",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "自我认同"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "书写毛笔汉字。",
      "happiest": "看电影。",
      "message": "做自己。",
      "comment": "那就把今日所学都运用到往后的学习中，保持自己的兴趣继续努力，活出自己的精彩人生^^"
    }
  },
  {
    "slug": "student-035-session-03-a",
    "childSlug": "student-035",
    "title": "书法与评奖",
    "imageId": "growth-card-158",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "评奖",
      "学习"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "可以给别人评奖",
      "message": "要努力学习",
      "comment": "哇！那就继续努力学习吧，期待以后在评委席能够看到你，老师相信你一定可以。"
    }
  },
  {
    "slug": "student-009-session-03-b",
    "childSlug": "student-009",
    "title": "开心最重要",
    "imageId": "growth-card-159",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "快乐",
      "自我确认"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写字",
      "happiest": "写毛笔",
      "message": "开心最重要",
      "comment": "是滴！开心最重要，既然写毛笔字这么开心，就继续保持热爱吧，我相信你一定能行的。我们一起继续加油！^^"
    }
  },
  {
    "slug": "student-027-session-03-a",
    "childSlug": "student-027",
    "title": "书法与继续加油",
    "imageId": "growth-card-160",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "电影",
      "坚持"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写书法",
      "happiest": "看电影",
      "message": "继续加油",
      "comment": "没错，保持奋斗的姿态，继续加油，我相信你一定能行的。今天的表现非常棒噢。^^"
    }
  },
  {
    "slug": "student-026-session-03-a",
    "childSlug": "student-026",
    "title": "写字与伙伴",
    "imageId": "growth-card-161",
    "dateLabel": "7月18日",
    "recordedOn": null,
    "dateConfidence": "uncertain",
    "sessionOrder": 3,
    "themes": [
      "书法",
      "同伴",
      "祝愿"
    ],
    "sourceKind": "standard",
    "kind": "structured",
    "fields": {
      "learned": "写毛笔字",
      "happiest": "和小伙伴玩",
      "message": "无",
      "comment": "寄言燕雀莫相啅\n自有云霄万里高"
    }
  }
] as const satisfies readonly GrowthDiary[];
