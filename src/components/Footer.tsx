export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-50 pointer-events-none flex items-end pb-4 pl-6">
      <div className="text-left">
        <table className="border-collapse">
          <tbody>
            <tr>
              <td className="text-left p-0">
                <pre
                  className="text-[6px] md:text-[8px] leading-none whitespace-pre select-none overflow-hidden text-white"
                  style={{
                    fontFamily:
                      '"Consolas", "Monaco", "Menlo", "Courier New", monospace',
                    letterSpacing: "0px",
                    fontVariantLigatures: "none",
                  }}
                >
                  {`   █████╗ ██╗███████╗██╗  ██╗██╗  ██╗
                      ██╔══██╗██║██╔════╝╚██╗██╔╝╚██╗██╔╝
                      ███████║██║█████╗   ╚███╔╝  ╚███╔╝
                      ██╔══██║██║██╔══╝   ██╔██╗  ██╔██╗
                      ██║  ██║██║███████╗██╔╝ ██╗██╔╝ ██╗
                      ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝`}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
}
