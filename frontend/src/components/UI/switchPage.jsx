import React, { useState } from "react";
import { Link } from "react-router-dom";

function SwitchPage({numThisPage, patternNextPage, previosLink, nextLink}) {
    numThisPage = Number(numThisPage);
  return (
    <div>
        {previosLink ? (
          <Link to={`${patternNextPage}${numThisPage - 1}`}>
            Предыдущая страница
          </Link>
        ) : null}
        {nextLink ? (
          <Link to={`${patternNextPage}${numThisPage + 1}`}>
            Следующая страница
          </Link>
        ) : null}
    </div>
  );
}

export default SwitchPage;
