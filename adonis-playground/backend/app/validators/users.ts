import vine from '@vinejs/vine'

export const getUserById = vine.compile(
  vine.object({
    id: vine.string().trim(),
  })
)

export const registerUser = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().trim(),
    password: vine.string().trim(),
    phoneNumber: vine.string().trim(),
  })
)

export const checkDuplicateEmail = vine.compile(
  vine.object({
    email: vine.string().trim(),
  })
)
