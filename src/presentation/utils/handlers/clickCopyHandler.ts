export default function clickCopyHandler(
  e: React.MouseEvent<any, MouseEvent>
): void {
  var text = e.target as HTMLElement;
  navigator.clipboard.writeText(text.innerText)
}
