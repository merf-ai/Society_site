import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ISwitchPage {
  numThisPage ?: string,
  patternNextPage ?: string,
  previosLink ?: string,
  nextLink ?: string | null,
}

function SwitchPage({numThisPage, patternNextPage, previosLink, nextLink}: ISwitchPage) {
    let numOnThisPage = Number(numThisPage);
  return (
    <div>
        {previosLink ? (
          <Link to={`${patternNextPage}${numOnThisPage - 1}`}>
            Предыдущая страница
          </Link>
        ) : null}
        {nextLink ? (
          <Link to={`${patternNextPage}${numOnThisPage + 1}`}>
            Следующая страница
          </Link>
        ) : null}
    </div>
  );
}

export default SwitchPage;
