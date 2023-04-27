export default function clickCopyHandler(
  e: React.MouseEvent<any, MouseEvent>
): Promise<boolean> {
  var text = e.target as HTMLElement;
  return navigator.clipboard.writeText(text.innerText).then(() => true).catch(() => false)
}
