export function shareURL(
  data: {
    title: string;
    url: string;
  },
  callback: () => void
) {
  if (typeof window !== 'undefined') {
    if (window.navigator?.share) {
      window.navigator
        .share({
          title: data.title,
          url: data.url
        })
        .then(() => {
          // 공유하기의 경우 callback 호출 X
        })
        .catch(console.error);
    } else if (window.navigator?.clipboard){
      window.navigator.clipboard
        .writeText(data.url)
        .then(() => {
          callback();
        })
        .catch(console.error);
    } else {
      // iOS 13.4 미만용
      const textArea = document.createElement('textarea')
      document.body.appendChild(textArea);
      textArea.value = data.url;
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      callback();
    }
  }
}
