export default function(context) {
  const { redirect, route } = context
  const currentPageName = route.name.split('___')[0]
  if (currentPageName === 'help') {
    redirect('https://support.pix.fr')
  }
}
