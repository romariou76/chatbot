export interface Cargo{
  amount: number
  currency_code: string
  email: string
  source_id: string
  capture: boolean
  metadata: Metadata

}

export interface Metadata{
  dni: string
}

export interface TokenTarjeta{
  card_number: string
  cvv: string
  expiration_month: string
  expiration_year: string
  email: string
  metadata: Metadata
}
