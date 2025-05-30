import React, { useEffect } from "react";
import PhoneImage from "../assets/gambar_homepage.svg";

function Home({ setIsLoggedIn }) {
  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, [setIsLoggedIn]);

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="flex justify-between items-center w-full max-w-6xl px-4 mx-auto">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-4 text-black">Lahan Damai</h1>
          <p className="text-lg mb-4 text-justify" style={{ color: "#5d3323" }}>
            Mobile app yang dirancang khusus untuk memberikan solusi yang
            efektif dan efisien bagi masyarakat yang terkena dampak sengketa
            tanah, khususnya untuk melaporkan sengketa tanah ke pemerintah.
          </p>
          <div>
            <a
              href="https://storage.googleapis.com/lahan-damai/app-release.apk"
              className="bg-[#5D3323] hover:bg-[#4a271e] text-white font-bold py-2 px-4 rounded flex items-center"
              style={{ width: "fit-content", padding: "0.5rem 1rem" }}
            >
              <svg
                fill="#FFFFFF"
                height="24px"
                width="24px"
                viewBox="0 0 299.679 299.679"
                className="mr-2"
              >
                <g id="XMLID_197_">
                  <path
                    id="XMLID_221_"
                    d="M181.122,299.679c10.02,0,18.758-8.738,18.758-18.758v-43.808h12.525c7.516,0,12.525-5.011,12.525-12.525
                    V99.466H74.749v125.123c0,7.515,5.01,12.525,12.525,12.525H99.8v43.808c0,10.02,8.736,18.758,18.758,18.758
                    c10.019,0,18.756-8.738,18.756-18.758v-43.808h25.051v43.808C162.364,290.941,171.102,299.679,181.122,299.679z"
                  />
                  <path
                    id="XMLID_222_"
                    d="M256.214,224.589c10.02,0,18.756-8.737,18.756-18.758v-87.615c0-9.967-8.736-18.75-18.756-18.75
                    c-10.021,0-18.758,8.783-18.758,18.75v87.615C237.456,215.851,246.192,224.589,256.214,224.589z"
                  />
                  <path
                    id="XMLID_223_"
                    d="M43.466,224.589c10.021,0,18.758-8.737,18.758-18.758v-87.615c0-9.967-8.736-18.75-18.758-18.75
                    c-10.02,0-18.756,8.783-18.756,18.75v87.615C24.71,215.851,33.446,224.589,43.466,224.589z"
                  />
                  <path
                    id="XMLID_224_"
                    d="M209.899,1.89c-2.504-2.52-6.232-2.52-8.736,0l-16.799,16.743l-0.775,0.774
                    c-9.961-4.988-21.129-7.479-33.566-7.503c-0.061,0-0.121-0.002-0.182-0.002h-0.002c-0.063,0-0.121,0.002-0.184,0.002
                    c-12.436,0.024-23.604,2.515-33.564,7.503l-0.777-0.774L98.516,1.89c-2.506-2.52-6.232-2.52-8.736,0
                    c-2.506,2.506-2.506,6.225,0,8.729l16.25,16.253c-5.236,3.496-9.984,7.774-14.113,12.667C82.032,51.256,75.727,66.505,74.86,83.027
                    c-0.008,0.172-0.025,0.342-0.033,0.514c-0.053,1.125-0.078,2.256-0.078,3.391H224.93c0-1.135-0.027-2.266-0.078-3.391
                    c-0.008-0.172-0.025-0.342-0.035-0.514c-0.865-16.522-7.172-31.772-17.057-43.487c-4.127-4.893-8.877-9.171-14.113-12.667
                    l16.252-16.253C212.405,8.115,212.405,4.396,209.899,1.89z M118.534,65.063c-5.182,0-9.383-4.201-9.383-9.383
                    c0-5.182,4.201-9.383,9.383-9.383c5.182,0,9.383,4.201,9.383,9.383C127.917,60.862,123.716,65.063,118.534,65.063z M181.145,65.063
                    c-5.182,0-9.383-4.201-9.383-9.383c0-5.182,4.201-9.383,9.383-9.383c5.182,0,9.383,4.201,9.383,9.383
                    C190.528,60.862,186.327,65.063,181.145,65.063z"
                  />
                </g>
              </svg>
              Download for Android
            </a>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-end">
          <img src={PhoneImage} alt="Phone" className="w-3/4" />
          <a
            href="https://www.vecteezy.com/free-vector/holding-mobile"
            className="text-sm text-white mt-2"
          >
            Holding Mobile Vectors by Vecteezy
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
