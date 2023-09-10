

export default async function requestApi<T>(
  endpoint: string,
  queryParams?: Record<string, string | number>
): Promise<T> {
  // queryParams가 존재하는 경우에만 처리
  const queryString = queryParams
    ? Object.keys(queryParams)
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&")
    : "";

  // API URL과 쿼리 매개변수를 결합
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_API_URL
  const apiUrl = `${serverUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(apiUrl);

    // HTTP 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    // JSON 데이터 파싱
    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    throw error;
  }
}