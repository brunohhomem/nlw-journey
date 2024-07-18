import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
  User,
  Mail
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CreateTripPage() {
  const navigate = useNavigate()
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState([
    'brunohhomem@gmail.com',
    'vitoriahomem@gmail.com'
  ]) //Array com vários emails

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email != emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function createTrip() {
    navigate('/trips/tripId')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center g-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai?"
                disabled={isGuestInputOpen}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 pl-1"
              />
            </div>

            <div className="flex items-center g-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Quando?"
                disabled={isGuestInputOpen}
                className="bg-transparent text-lg placeholder-zinc-400 w-40  outline-none pl-1"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestInputOpen ? (
              <button
                onClick={closeGuestInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={openGuestInput}
              >
                Continuar
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button
                type="button"
                onClick={openGuestModal}
                className="flex items-center g-2 flex-1"
              >
                <UserRoundPlus className="size-5 text-zinc-400 pr-1" />

                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100">
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className="text-zinc-400 text-lg flex-1 text-left">
                    Quem estará na viagem?
                  </span>
                )}
              </button>

              <div className="w-px h-6 bg-zinc-800" />

              <button
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
                onClick={openConfirmTripModal}
              >
                Confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br />
          com nossos{' '}
          <a href="" className="text-zinc-300">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="" className="text-zinc-300">
            {' '}
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {/* Modal Guests*/}
      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <X className="size-5 text-zinc-400" onClick={closeGuestModal} />
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email => {
                return (
                  <div
                    key={email}
                    className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{email}</span>
                    <button type="button">
                      <X
                        onClick={() => removeEmailFromInvites(email)}
                        className="size-4 text-zinc-400"
                      />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <form
              onSubmit={addNewEmailToInvite}
              action=""
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
            >
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5 " />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <button
                type="submit"
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Convidar
                <Plus className="size-5 text-lime-950" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmação*/}
      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-lg py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar criação de viagem
                </h2>
                <X
                  className="size-5 text-zinc-400"
                  onClick={closeConfirmTripModal}
                />
              </div>
              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para{' '}
                <span className="text-zinc-100 font-semibold">
                  Florianópolis, Brasil
                </span>{' '}
                nas datas de{' '}
                <span className="text-zinc-100 font-semibold">
                  16 a 27 de agosto de 2024
                </span>
                , preencha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={addNewEmailToInvite} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 ">
                <User className="text-zinc-400 size-5 " />
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 ">
                <Mail className="text-zinc-400 size-5 " />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <button
                type="submit"
                onClick={createTrip}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center"
              >
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}