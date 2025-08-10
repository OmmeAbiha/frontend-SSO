type AsciiLogoInfo = {
  version?: string;
  origin?: string;
  message?: string;
  debug?: boolean;
  themeColor?: "green" | "blue" | "red" | "yellow" | string;
};

export const logLogo = (asciiLogoInfo: AsciiLogoInfo = {}) => {
  const {
    version = "1.0.0",
    origin = "Unknown",
    message = "Welcome to the App!",
    debug = true,
    themeColor = "green",
  } = asciiLogoInfo;

  if (!debug) return; // خروج اگر لاگ غیرفعاله

  const colorMap: Record<string, string> = {
    green: "#6DA749",
    blue: "#3B82F6",
    red: "#EF4444",
    yellow: "#F59E0B",
  };

  const color = colorMap[themeColor] || themeColor;

  console.log(
    `%c    
                    .::::             
                .**:.  =*:            
            .:-*= :=.*#-:.            
        .:--::#:.* :%= ..:--:         
      .--: .:*= * .%*-----. :--.      
    .--: :-=*#::* +%=-------:..--     
   .-: :--=+   :* #*=---------: :-.   
  :-: ----==  :*#:*:*-----------..-.  
 .-: :----=%=.+   :+++-----------.:-. 
 :- :----=+   =*.  #:++----------- :: 
.-: -----**  #.     #.-#----------.:-.
.-: -----#+- #:     .#..#=--------..-.
.-: -----=*.%.:#.    .#. ++-------:.-.
.-: -------#-=+ *:    .#. =+------..-.
.-: ---------%-*:#     .#  #=-----..-.
.-: ---------=*#+*      -+  #-----:.-.
.-: -------**.   .#:    .#  %-----..-.
.-: ------*: :%%= .%    .#  %-----..-.
.-: ------%. #%%+ -=    =: ==-----:.-.
.-: ------#* :***#:    += .%------..-.
.-: -------%%=      .**. :%-------..-.
.-: --------#=:=***=.  -%=--------:.-.
.-: ----------=*##*##*=-----------..-.
.-:.------------------------------::-.
 :::::::::::::::::::::::::::::::::::. 
%c
 Version : ${version}
 Origin  : ${origin}
 Message : ${message}
 `,
    `color: ${color}; font-weight: bold`,
    ""
  );
};
