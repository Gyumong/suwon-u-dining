import {Inter} from 'next/font/google'
import requestApi from "@/utils/requestApi";
import {ApiResponse} from "@/interface/diet";
import {Card, CardBody, CardHeader, Chip} from '@nextui-org/react';
import getDate from "@/utils/getDate";
import BottomButton from "@/components/BottomButton";
import {shareURL} from '@/utils/shareUrl';
import ErrorFallbackComponent from "@/components/ErrorFallbackComponent";
import Script from 'next/script';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data,error }: { data: ApiResponse,error:boolean }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if(error) return <ErrorFallbackComponent/>

  const handleClickCopy = () => {
    shareURL(
      {
        title: '수원대학교 학식',
        url: `https://suwon-u-dining.vercel.app`,
        onCompleted: () => toast("링크를 복사했습니다.",{
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    );
  };

  const dietInfo = data?.result?.dateAndTypeDietInfo
  const 오늘날짜 = getDate();
  console.log('data',dietInfo)
  return (
    <>
      <ToastContainer/>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-SK7WHF4GEH`} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-SK7WHF4GEH')
        `}
      </Script>
    <main className={`mx-auto max-w-[520px]  pt-16 ${inter.className}`}>
      <div className="flex  flex-col items-center justify-center pl-6 pr-6">
        <div className="mb-4 flex flex-col items-center text-gray-900">
           <h2 className="text-2xl mb-2">{오늘날짜}</h2>
            <p className="text-xl">11:30~14:00</p>
        </div>
        {dietInfo?.map((item, index) => (
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
          <ul className="text-gray-700">
            <li>간편식 샐러드 BOX : 5,000원</li>
            <li>즉석 셀프 라면 : 4,500원</li>
          </ul>
          <div className="text-center mt-7 text-gray-700">© 코집사</div>
        </div>
      </div>
      <BottomButton onClick={handleClickCopy}>공유하기</BottomButton>
    </main>
    </>
  )
}


export async function getStaticProps() {
  try{
  const currentDate = new Date().toISOString();

  const data = await requestApi<ApiResponse>("/v1/diet",{
    date: currentDate,
    type: 'LUNCH'
  })
  return {
    props: {
      data
    }
  }
  }catch (e){
    console.error('Error fetching data',e)
    return {
      props:{
        data:null,
        error: true
      }
    }
  }
}