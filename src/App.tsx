import { FormEvent, useState } from 'react'
import './App.css'
import { ArrowRight, AtSign, Calendar, MapPin, Plus, Settings2, UserRoundPlus, X } from 'lucide-react'

function App() {

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModelOpen, setIsGuestModelOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'matheus.felipe.bota.10@gmail.com'
  ])

  function guestOpenInputChange() {
    setIsGuestInputOpen(true)
  }

  function guestCloseInputChange(){
    setIsGuestInputOpen(false)
  }

  function guestModelChange(){
    setIsGuestModelOpen(true)
  }

  function guestCloseModelChange(){
    setIsGuestModelOpen(false)
  }

  function addNewEmail(event: FormEvent<HTMLFormElement>){
    event?.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailsToRemove: string){
    const newEmailList = emailsToInvite.filter(email => email !== emailsToRemove)

    setEmailsToInvite(newEmailList)
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='max-w-3xl w-full px-6 text-center space-y-18'>
        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='planner' />
          <p className='text-zinc-300 text-lg'>Convide seus amigos e planeja sua proxima viagem!</p>
        </div>

        <div className='space-y-2'>
        <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center placeholder-zinc-400 outline-none flex-1'>
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='size-5 text-zinc-400'/>
            <input disabled={isGuestInputOpen} type='text' placeholder='Para onde voce vai ?' className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
          </div>

          <div className='flex items-center gap-2'>
            <Calendar className='size-5 text-zinc-400'/>
            <input disabled={isGuestInputOpen} type='text' placeholder='quando ?' className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none'/>
          </div>

          <div className='w-px h-6 bg-zinc-800'/>

          {isGuestInputOpen ? (
            <button onClick={guestCloseInputChange} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
              Alterar local/data
              <Settings2 className='size-5 '/>
            </button>
          ):(
            <button onClick={guestOpenInputChange} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
              Continuar 
              <ArrowRight className='size-5'/>
            </button>
          )}

          {isGuestInputOpen && (
            <div className='h-16 bg-zinc-900 px-4 rounded-xl flexx items-center shadow-shape gap-3'>
              <button type='button' onClick={guestModelChange} className='flex items-center gap-2 flex-1 text-left'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                <span className='text-zinc-400 text-lg flex-1'>Quem estará na viagem ?</span>
              </button>
              <div className='w-px h-6 bg-zinc-800' />
              <button className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar viagem
                <ArrowRight className='size-5' />
              </button>
            </div>
          )}
          </div>
        </div>

        <p className='text-sm text-zinc-400'>
          Ao planejar sua viagem pela planner voce automaticamente concorda <br /> com nossa <a className='text-zinc-300 underline' href='#'> termos de uso</a> e
          <a className='text-zinc-300' href='#'>politica de privacidade</a>
        </p>
      </div>

      {isGuestModelOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar Convidados</h2>
                <button type='button' onClick={guestCloseModelChange}>
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                <span className='text-zinc-300'>{email}</span>
                <button type='button' onClick={() => removeEmailFromInvite}><X className='size-4 text-zinc-400'></X></button>
              </div>
                )
              })}
            </div>
            <div className='w-full h-px bg-zinc-800'/>
            <form onClick={addNewEmail} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <div className='px-2 flex items-center flex-1 gap-2 '>
                <AtSign className='text-zinc-400 size-5'/>
                <input type='email' name='email' placeholder='Digite o e-mail convidado' className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1'/>
              </div>

              <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar viagem
                <Plus className='size-5' />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
