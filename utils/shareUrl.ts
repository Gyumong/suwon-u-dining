interface CopyURLParams {
  title: string;
  url: string;
  onCompleted?: () => void;
  onError?: () => void;
}


export const shareURL =({title, url,onCompleted,onError }:CopyURLParams) =>{
  if (typeof window !== 'undefined') {
    if (window.navigator?.share) {
      window.navigator
        .share({
          title,
          url
        })
        .then(() => {
          onCompleted?.();
        })
        .catch(() => {
          onError?.();
        });
    } else {
      window.navigator.clipboard
        .writeText(url)
        .then(() => {
          onCompleted?.();
        })
        .catch(() => {
          let input = document.createElement('input');
          input.setAttribute('value', url);
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        });
    }
  }
}
