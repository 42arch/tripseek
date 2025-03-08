import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'
import { FormParam } from '@/types'

const openai = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
})

const getPersonNumber = (personNumber: FormParam['personNumber']) => {
  switch (personNumber) {
    case 'solo':
      return '单人'
    case 'duo':
      return '双人'
    case 'family':
      return '家庭，三人以上'
    case 'group':
      return '组团，四人以上'
  }
}

export async function POST(request: Request, context: any) {
  try {
    const body = await request.json()
    const {
      budget,
      duration,
      preferences,
      departure,
      destination,
      personNumber,
      ps
    } = body
    const prompt = `作为一个旅游规划专家，请根据以下条件制定旅游计划：
    出发地：${departure},
    目的地：${destination},
    预算：${budget}
    时长：${duration},
    偏好：${preferences},
    人数：${getPersonNumber(personNumber)},
    补充说明：${ps}
    请提供详细的旅游建议。
    `

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一个专业的旅游规划助手，需要提供详细的旅游建议，包括包括：1. 推荐目的地；2. 交通方式；3. 具体行程安排；4. 预算分配。
            以及GeoJSON格式的地理数据。以 JSON 的形式输出，并遵守以下的格式：
            {
              "summary": <文字总结>,
              "itinerary": <行程安排，以天或半天为单位，此项是个数组，每个元素包含出发地，目的地，经纬度，行程描述，交通工具，预算，以及一个景点子数组，注意：从第0天开始，但第0天不作为旅行地点>,
              "budget": <预算项，此项是个数组，按照餐饮，住宿，交通等项组织>
            }。
            示例如下：
            {
              "summary": "对行程的总结",
              "itinerary": [{ day: "第一天", "from": "北京", "destination": "杭州", "coordinates": [120.1550, 30.27408], "description": "", transportation: "高铁", budget: 500, 
                attractions: [{ "name": "断桥残雪", "description": "简单的描述", "coordinates":  [120.148, 30.258]}]}],
              "budget": [{"category": "餐饮", "amount": 1000, "summary": "简单的总结"}]
            }
            `
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: {
        type: 'json_object'
      },
      temperature: 0.7,
      max_tokens: 2000
    })

    const response = completion.choices[0].message.content
    console.log(2222, response)
    return NextResponse.json(response, {
      status: 200
    })
  } catch (error: any) {
    console.error('Error:', error)

    // 更详细的错误处理
    if (error?.status === 403) {
      return NextResponse.json(
        {
          error:
            '区域访问限制：请确保您的OpenAI API密钥可以在当前区域使用，或考虑使用代理服务器。'
        },
        {
          status: 403
        }
      )
    }

    if (error?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error: '无法连接到OpenAI服务：请检查您的网络连接或代理设置。'
        },
        {
          status: 503
        }
      )
    }

    return NextResponse.json(
      {
        error: '生成旅游计划时出错，请稍后重试。'
      },
      {
        status: 500
      }
    )
  }
}
