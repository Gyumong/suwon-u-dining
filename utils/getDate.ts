// 현재 날짜 객체 생성

const getDate = () =>{
const currentDate = new Date();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
// 날짜와 월을 가져오기 (월은 0부터 시작하므로 1을 더해줍니다)
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
  const dayOfWeek = daysOfWeek[currentDate.getDay()]; // 요일 구하

// 날짜와 월이 한 자리 수인 경우 앞에 0을 붙입니다
const formattedDay = day < 10 ? `0${day}` : day;
const formattedMonth = month < 10 ? `0${month}` : month;

return `${formattedMonth}-${formattedDay} (${dayOfWeek})`

}

export default getDate;