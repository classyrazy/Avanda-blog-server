const base = (content) => {
  return `<body style="padding: 0; margin: 0;color: #4a4a4a; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif!important; letter-spacing: 0!important;line-height: 140%!important;background: #afe5b1;">
<div style="height: 20px"></div>
<div style="padding: 10px">
    <!--    BODY-->
    <div style="max-width: 600px; margin-left: auto;  margin-right: auto; border: 1px solid #40A045">
        <!--        THE WHITE CONTAINER-->
        <div style="padding: 20px;text-align: center; background: #ffffff;">
            <!--            HEADER-->
            <h2 style="margin: 0; color: #fff">
                <img src="https://tyfarms.com/tee-y-farm-logo.png" style="max-width: 160px; width: 100%; height: auto; ">
            </h2>
        </div>
        <div style="padding: 30px;  background: white;">
           ${content}
        </div>

        <div style="padding: 20px; background: white; text-align: center; font-size: smaller">
            <!--            FOOTER-->
            &copy; 2022 Tyfarms.com
        </div>
    </div>
</div>

</body>
`
}

export default base