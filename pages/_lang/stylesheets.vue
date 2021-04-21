<template lang="pug">
  .management-page
    section.mt-16
      .block-content.max-w-6xl
        h1 Button

        .grid.grid-cols-4.w-full.justify-items-start.gap-x-24.gap-y-8.mt-16
          p.font-noto.font-semibold Primary
          button.button.button-primary Button
          button.button.button-primary.is-loading Button
          button.button.button-primary(disabled) Button

          p.font-noto.font-semibold Primary only icon
          button.button.button-primary.is-square
            ion-icon(name="bookmark-outline")
          button.button.button-primary.is-square.is-loading
            ion-icon(name="bookmark-outline")
          button.button.button-primary.is-square(disabled)
            ion-icon(name="bookmark-outline")


          p.font-noto.font-semibold Secondary
          button.button Button
          button.button.is-loading Button
          button.button(disabled) Button


          p.font-noto.font-semibold Secondary only icon
          button.button.is-square
            ion-icon(name="bookmark-outline")
          button.button.is-square.is-loading
            ion-icon(name="bookmark-outline")
          button.button.is-square(disabled)
            ion-icon(name="bookmark-outline")


          p.font-noto.font-semibold Icon
          button.button.border-0.is-square
            ion-icon(name="bookmark-outline")
          button.button.border-0.is-square.is-loading
            ion-icon(name="bookmark-outline")
          button.button.border-0.is-square(disabled)
            ion-icon(name="bookmark-outline")

          p.font-noto.font-semibold Link
          a Button
          a
          a(disabled) Button

          p.font-noto.font-semibold
          a.font-semibold Button
          a
          a.font-semibold(disabled) Button

      .block-content.max-w-6xl.mt-16
        h1 Form

        .grid.grid-cols-3.gap-x-8.w-full.mt-8
          .block
            label Input
            Input(maxlength="40" :descriptions="`${inputValue.length}/40`" v-model="inputValue")

          .block
            label Input
            Input(:error="'Error Text'" v-model="inputValue")

          .block
            label Input
            Input(disabled v-model="inputValue")

        .grid.grid-cols-3.gap-x-8.w-full.mt-8
          .block
            label Price Input
            PriceInput(v-model="priceInputValue")

          .block
            label Integer Input (min: 1, max: 15)
            IntegerInput(:min="1" :max="15" v-model="integerInputValue")

          .block
            label Async Suggester Input
            AsyncSuggesterInput(:suggester="fetchSuggestions")

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Dropdown
            Dropdown(:options="dropdownOptions" v-model="dropdownValue")

          .block
            label Dropdown
            Dropdown(disabled :options="dropdownOptions" v-model="dropdownValue")

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Datepicker
            DatePicker(v-model="date")

          .block
            label Datepicker
            DatePicker(disabled v-model="date")

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Timepicker
            TimePicker(v-model="date")

          .block
            label Timepicker
            TimePicker(disabled v-model="date")

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Timepicker
            TimePicker(v-model="date")

          .block
            label Timepicker
            TimePicker(disabled v-model="date")
        
        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Tags
            Tags(placeholder="Add some keywords" :keywords="keywords" v-model="tags")
          
          .block
            label Tags
            Tags(disabled placeholder="Add some keywords" :keywords="keywords" v-model="tags")
        
        .grid.grid-cols-1.w-full.mt-6
          .block
            label Async Tags
            AsyncTags(placeholder="Add some keywords" :suggester="fetchKeywords" v-model="asyncTags")
        

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Sub District
            SubDistrictInput(@select="onSelectAddress" v-model="address.subDistrict")
          
          .block
            label District
            DistrictInput(@select="onSelectAddress" v-model="address.district")

        .grid.grid-cols-2.gap-x-8.w-full.mt-6
          .block
            label Province
            ProvinceInput(@select="onSelectAddress" v-model="address.province")
          
          .block
            label Zipcode
            ZipcodeInput(@select="onSelectAddress" v-model="address.zipcode")
        

        .grid.grid-cols-1.w-full.mt-6
          .block
            label Richtext Editor
            RichTextEditor(v-model="richtext")
        

        .grid.grid-cols-4.gap-x-8.w-full.mt-6
          .block
            label Radio
            Radios.mt-3(name="radio-1" :options="radios" v-model="radio")

          .block
            label Radio
            Radios.mt-3(name="radio-2" :options="radios" v-model="radio" disabled)
          
          .block
            label Checkbox
            Checkboxes.mt-3(name="checkbox-1" :options="checkboxes" v-model="checkbox")

          .block
            label Checkbox
            Checkboxes.mt-3(name="checkbox-1" :options="checkboxes" v-model="checkbox" disabled)

      .block-content.max-w-6xl.mt-16
        h1 Modal

        .grid.grid-cols-1.w-full.mt-8
          .block
            Modal(ref="modal") Lorem Ipsum is simply dummy text of the printing and typesetting industry
            label Default Modal
            button.button.button-primary.mt-3(@click="showModal") Show Modal

        .grid.grid-cols-1.w-full.mt-8
          .block
            EditableModal(ref="editableModal")
              template(#default) Lorem Ipsum is simply dummy text of the printing and typesetting industry
              template(#bottom-slot)
                button.button Close
                button.button.button-primary Button

            label Editable Modal
            button.button.button-primary.mt-3(@click="showEditableModal") Show Modal


</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import Input from '@/components/forms/Input.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import DatePicker from '@/components/forms/DatePicker.vue'
import TimePicker from '@/components/forms/TimePicker.vue'
import Tags from '@/components/forms/Tags.vue'
import AsyncTags, { ITag } from '@/components/forms/AsyncTags.vue'
import SubDistrictInput from '@/components/forms/geo/SubDistrictInput.vue'
import DistrictInput from '@/components/forms/geo/DistrictInput.vue'
import ProvinceInput from '@/components/forms/geo/ProvinceInput.vue'
import ZipcodeInput from '@/components/forms/geo/ZipcodeInput.vue'
import RichTextEditor from '@/components/forms/RichTextEditor.vue'
import Radios, { Option } from '@/components/forms/Radios.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import Checkboxes from '@/components/forms/Checkboxes.vue'
import Modal from '@/components/modals/base/Modal.vue'
import EditableModal from '@/components/modals/base/EditableModal.vue'
import PriceInput from '@/components/forms/PriceInput.vue'
import IntegerInput from '@/components/forms/IntegerInput.vue'
import AsyncSuggesterInput, {
  ISuggestedValue,
} from '@/components/forms/AsyncSuggesterInput.vue'

import { DropdownOption } from '@/components/menus/Dropdown.vue'
import { escapeRegExp, uniqueId } from 'lodash'
import { IAddress } from '@/helpers/modules/Geo'

export default defineComponent({
  components: {
    Input,
    Dropdown,
    DatePicker,
    TimePicker,
    Tags,
    AsyncTags,
    SubDistrictInput,
    DistrictInput,
    ProvinceInput,
    ZipcodeInput,
    RichTextEditor,
    Radios,
    Checkbox,
    Checkboxes,
    Modal,
    EditableModal,
    PriceInput,
    IntegerInput,
    AsyncSuggesterInput,
  },

  setup() {
    const modal = ref<InstanceType<typeof Modal>>()
    const editableModal = ref<InstanceType<typeof EditableModal>>()

    return {
      modal,
      editableModal,
    }
  },

  data() {
    return {
      inputValue: 'test',
      priceInputValue: 0,
      integerInputValue: 1,
      dropdownOptions: [
        {
          content: 'Item 1',
          value: 1,
        },
        {
          content: 'Item 2',
          value: 2,
        },
        {
          content: 'Item 3',
          value: 3,
        },
        {
          content: 'Item 4',
          value: 4,
        },
        {
          content: 'Item 5',
          value: 5,
        },
        {
          content: 'Item 6',
          value: 6,
        },
        {
          content: 'Item 7',
          value: 7,
        },
        {
          content: 'Item 8',
          value: 8,
        },
      ] as DropdownOption[],

      dropdownValue: null,

      date: null,

      keywords: [
        'cat',
        'dog',
        'car',
        'shit',
        'thichanont',
        'cow',
        'ox',
        'horse',
        'bird',
        'goat',
        'sheep',
        'snake',
        'burn',
      ],

      address: {
        subDistrict: '',
        district: '',
        province: '',
        zipcode: '',
      },

      richtext: 'Test',

      radios: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ] as Option[],

      checkboxes: [
        {
          label: 'Check 1',
          value: 'check-1',
        },
        {
          label: 'Check 2',
          value: 'check-2',
        },
      ] as Option[],

      tags: [],
      asyncTags: [],
      radio: '',
      checkbox: [],
    }
  },

  computed: {
    asyncKeywords(): ITag[] {
      return this.keywords.map((keyword) => ({
        id: parseInt(uniqueId()),
        name: keyword,
      }))
    },
  },

  methods: {
    fetchKeywords(value: string): Promise<ITag[]> {
      const regexp = new RegExp(escapeRegExp(value), 'i')

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            this.asyncKeywords.filter((keyword) => keyword.name.match(regexp))
          )
        }, 250)
      })
    },

    fetchSuggestions(value: string): Promise<ISuggestedValue[]> {
      const regexp = new RegExp(escapeRegExp(value), 'i')

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            this.asyncKeywords.filter((keyword) => keyword.name.match(regexp))
          )
        }, 250)
      })
    },

    showModal() {
      this.modal?.show()
    },

    showEditableModal() {
      this.editableModal?.show()
    },

    onSelectAddress(address: IAddress) {
      const { subDistrict, district, province, zipcode } = address

      this.address = {
        subDistrict,
        district,
        province,
        zipcode: zipcode || '',
      }
    },
  },
})
</script>
