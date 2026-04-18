import { useEffect } from 'react'

function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Business for All`
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')

      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      }

      metaDescription.content = description
    }
  }, [description, title])
}

export default usePageMeta
