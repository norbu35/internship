import * as yup from "yup";

export const schemaScholarship = yup.object().shape({
  scholarshipName: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  scholarshipDescription: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  startDate: yup
    .date()
    .typeError("Жишээ нь 2023-04-20")
    .required("Огноо сонгоно үү"),
  endDate: yup
    .date()
    .typeError("Жишээ нь 2023-04-20")
    .required("Огноо сонгоно үү"),
  status: yup.number().required("Статус сонгоно уу"),
});

export const schemaTestimonial = yup.object().shape({
  lastname: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  firstname: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  profession: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  comment: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  status: yup.number().required("Статус сонгоно уу"),
});

export const schemaFaq = yup.object().shape({
  question: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  answer: yup
    .string()
    .matches(
      /^[\u0400-\u04FF\u0020-\u0040\u20AE]+$/gi,
      "Kирилл үсэг хэрэглэнэ үү"
    )
    .required("Талбарыг бөглөнө үү"),
  status: yup.number().required("Статус сонгоно уу"),
});
