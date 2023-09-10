import Image from 'next/image'
import { Inter } from 'next/font/google'
import requestApi from "@/utils/requestApi";
import {ApiResponse} from "@/interface/diet";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@nextui-org/react';
import getDate from "@/utils/getDate";
import BottomButton from "@/components/BottomButton";
import { shareURL } from '@/utils/shareUrl';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }: { data: ApiResponse }) {

  const handleClickCopy = () => {
    shareURL(
      {
        title: '수원대학교 학식',
        url: `도메인주소`
      },
      () => alert('경로가 복사되었습니다.')
    );
  };

  const dietInfo = data.result.dateAndTypeDietInfo
  const 오늘날짜 = getDate();
  console.log('data',dietInfo)
  return (
    <main className="mx-auto max-w-[520px]  pt-16">
      <div className="flex  flex-col items-center justify-center pl-6 pr-6">
        <div className="mb-4 flex flex-col items-center">
           <h2 className="text-2xl mb-2">{오늘날짜}</h2>
            <p className="text-xl">11:30~14:00</p>
        </div>
        {dietInfo.map((item, index) => (
          <Card
            key={index}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[400px] w-full mb-4"
            shadow="sm"
          >
            <CardHeader className="flex justify-between">
              {item.restaurantType.includes("STUDENT") ? (<><Chip color="primary">학생</Chip>          <div>6000원</div></>):  (<><Chip color="secondary">교직원</Chip>         <div>8000원</div></>)}

            </CardHeader>
            <CardBody className="gap-2">
              {item.mainMenu.map((menu, menuIndex) => (
                <div key={menuIndex} className="text-md">
                  {menu}
                </div>
              ))}
              <div>{item.commonMenu.join(', ')}</div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="bg-gray-100">
        <div className="pl-6 pr-6 pb-[108px]">
          <div className="flex gap-x-5 whitespace-pre-line pt-5 pb-3 my-[3px] gap-y-1.5">
            <h1 className="text-gray-900">이용안내</h1>
          </div>
          <ul>
            <li>간편식 샐러드 BOX : 5,000원</li>
            <li>즉석 셀프 라면 : 4,500원</li>
          </ul>
        </div>
      </div>
      <BottomButton onClick={handleClickCopy}>공유하기</BottomButton>
    </main>
  )
}


export async function getStaticProps() {
  const currentDate = new Date();

// 날짜에 하루를 더하기
  currentDate.setDate(currentDate.getDate() + 1);

// 날짜를 ISO 형식으로 변환
  const tomorrowDate = currentDate.toISOString();
  const data = await requestApi<ApiResponse>("/v1/diet",{
    date: tomorrowDate,
    type: 'LUNCH'
  })
  return {
    props: {
      data
    }
  }
}