import BaseFormField from "@/components/BaseFormField.vue";
export default {
  // входные параметры нельзя менять напрямую, поэтому исп двунаправленное свойство computed
  //общий код подкл через mixin , а шаблон передается через слот
  props: ["title", "error", "placeholder", "value"], //  так как при подкл комп исп м-model , то значение буде value
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
