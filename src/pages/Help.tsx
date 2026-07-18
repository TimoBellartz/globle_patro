// import useCheckMobile from "../hooks/useCheckMobile";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { ThemeContext } from "../context/ThemeContext";
import { FormattedMessage } from "react-intl";
import Auxilliary from "../components/Auxilliary";

export default function Help() {
  // Theme
  const { nightMode } = useContext(ThemeContext).theme;



  return (
    <div className="my-2 space-y-7 dark:text-gray-200">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        <FormattedMessage id="helpTitle" />
      </h2>
      <p>
        <FormattedMessage
          id="help1"
          values={{
            b: (chunks: string) => (
              <b className={nightMode ? "text-purple-400" : "text-red-800"}>
                {chunks}
              </b>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="help2"
          values={{ b: (chunks: string) => <b>{chunks}</b> }}
        />
      </p>

      <p>
        <FormattedMessage id="help3" />
      </p>
      <Auxilliary screen="Help" />
    </div>
  );
}
