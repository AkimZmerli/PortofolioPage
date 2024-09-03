export default function Banner() {
  return (
    <div
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        whiteSpace: "pre-wrap", // Ensures whitespace and line breaks are preserved
        lineHeight: "1.2", // Adjust line height to prevent squishing
        fontSize: "14px", // Set font size to ensure readability
        display: "flex",
        maxWidth: "600px",
      }}
    >
      <span style={{ width: "500px", height: "300px" }}>
        ⠀⢴⢖⠂⠩⠭⠉⣉⠐⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀ ⠀⠀⠑⠪⠾⢳⡔⠀⢋⠅⠒⠠⣑⠢⣀⡠⠔⣊⠭⠀⢒⠒⡒⢖⠫⠱⢶⣤⡀⠀
        ⠀⠀⠀⠀⠀⠀⠉⠉⣳⠥⠤⠓⢚⡛⢿⢖⣿⣷⣧⣆⢂⢂⠰⠀⠆⠡⠐⠘⡍⢣ ⠀⠀⠀⠀⢀⡤⠒⠉⡀⠤⠒⡍⠄⢠⣇⡀⢁⠢⣈⠓⠮⣄⣀⡗⡌⠤⠿⠔⠊⠁
        ⠀⠀⢀⠔⢁⠠⠒⢡⠘⢠⣅⣰⣼⣿⣿⣷⣦⠆⡠⢑⢄⠈⢢⠀⠀⠀⠀⠀⠀⠀ ⢀⣔⡡⠆⢃⠃⣞⣀⠦⢺⣾⣿⣿⣿⢯⣿⣿⣷⣤⡥⢀⠥⡀⢣⠀⠀⠀⠀⠀⠀
        ⠺⠿⠼⠼⠤⠒⠁⠀⠠⡿⠋⠁⢠⠧⠔⣟⠠⣾⠁⠙⠲⣦⣐⡄⢇⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠓⢂⣴⠛⣶⠏⠀⠀⠀⠻⢍⡿⣜⡄⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠗⠂⠉⡎⠀⠙⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠁⢉⡺⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⢀⡜⠒⠊⡙⡰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⢠⠏⠑⠂⣬⣤⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⡞⡠⠒⢉⠃⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⢰⣋⠀⢠⣄⣀⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠄⠂⡎⠀⠈⣭⣍⠀⠸⡀⢲⠂⠀⢂⣴⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⣀⣀⣀⣐⣀⣉⣀⣀⣈⣉⣀⣀⣑⣀⣶⣮⣺⣿⣏⣢⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀
        ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "300px",
          maxHeight: "300px",
        }}
      >
        <pre className="text-sm">
          {`
      /$$$$$$  /$$       /$$                     /$$$$$$$$                                 | $$ /$$
     /$$__  $$| $$      |__/                    |_____ $$                                  | $$|__/
    | $$  \ $$|  $$  /$$ /$$ /$$$$$$/$$$$            /$$/  /$$$$$$/$$$$   /$$$$$$   /$$$$$$ | $$ /$$
    | $$$$$$$$| $$  /$$/|$$| $$_  $$_  $$          /$$/  | $$_  $$_  $$ /$$__  $$ /$$____/ | $$| $$
    | $$__  $$| $$$$$$/ |$$| $$ \  $$ \  $$         /$$/   | $$ \  $$ \  $$| $$$$$$$$| $$      | $$| $$
    | $$  | $$| $$_  $$ |$$| $$ | $$ | $$        /$$/    | $$ | $$ | $$| $$_____/| $$      | $$| $$
    | $$  | $$| $$ \  $$| $$| $$ | $$ | $$       /$$$$$$$$| $$ | $$ | $$|  $$$$$$$| $$      | $$| $$
    |__/  |__/|__/  \__/|__/|__/ |__/ |__/      |________/|__/ |__/ |__/ \_______/|__/       |__/|__/
`}
        </pre>
      </span>
    </div>
  );
}
