<template>
  <div role="pdf-viewer"></div>
</template>

<script>
import { getPDFObject } from '@/lib/pdf-object'
export default {
  props: {
    src: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      PDFObject: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$watch(
        'src',
        function handler(v) {
          this.embedPDF(v)
        },
        { immediate: true }
      )
    })
  },
  methods: {
    async loadPDFObject() {
      if (!this.PDFObject) {
        await getPDFObject().then((module) => {
          this.PDFObject = module
        })
      }
      return Promise.resolve(true)
    },
    async embedPDF(src) {
      if (!src) {
        return
      }
      if (!this.PDFObject) {
        await this.loadPDFObject()
      }
      this.PDFObject.embed(src, this.$el, {
        pdfOpenParams: {
          view: 'FitV',
        },
      })
    },
  },
}
</script>

<style></style>
