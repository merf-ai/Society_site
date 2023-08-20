import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <div id="error-page">
      <h1>Упс!</h1>
      <p>Извините, произошла непредвиденная ошибка.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}