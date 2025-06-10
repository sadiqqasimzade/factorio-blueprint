export default function clickCopyHandler(e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<boolean> {
  const text = e.target as HTMLElement;
  return navigator.clipboard.writeText(text.innerText).then(() => true).catch(() => false)
}
