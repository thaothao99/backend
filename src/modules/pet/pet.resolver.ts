import {
	Resolver,
	Query,
	Args,
	Mutation,
} from '@nestjs/graphql'
import { MongoRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { InjectRepository } from '@nestjs/typeorm'
import {Pet, PetInput, UpdatePetInput} from './pet.entity'
@Resolver('pet')
export class PetResolver {
  constructor (
    @InjectRepository(Pet)
    private readonly petRepository: MongoRepository<Pet>
  ) {}
  
  @Query('pets')
  async pets(@Args('species') species: string, @Args('inputSearch') inputSearch: string ) {
    const conditional = { isActive: true }
    if (species) {
      conditional['species']=species
    }

    if (inputSearch) {
      conditional['name']= { $regex: new RegExp(inputSearch,'gi') }
    }

    return await this.petRepository.find({
        where: conditional
      })

  }

  @Query('pet')
  async pet(@Args('_id') _id: string): Promise<Pet> {
    try {
			const message = 'Not Found: Pet'
			const code = '404'
			const additionalProperties = {}

			const pet = await this.petRepository.findOne({_id, isActive: true})

			if (!pet) {
				throw new ApolloError(message, code, additionalProperties)
			}

			return pet
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Query('petByOwner')
  async petByOwner(@Args('owner') owner: string, @Args('species') species: string, @Args('inputSearch') inputSearch: string) {
    const conditional = { isActive: true }
    conditional['owner'] = owner
    if (species) {
      conditional['species']=species
    }

    if (inputSearch) {
      conditional['name']= { $regex: new RegExp(inputSearch,'gi') }
    }

    return await this.petRepository.find({
        where: conditional
      })

  }
  @Mutation('createPet')
  async createPet(@Args('input') input: PetInput): Promise<Pet> {
    const {name, age, breed, gender, health, owner, species, urlImg} = input
    const message = "Tên Pet đã tồn tại"
    const existedPet =  await this.petRepository.findOne({name, owner, isActive: true})
    console.log(existedPet)
    if(existedPet){
      throw new Error(message)
    }
    const pet = new Pet()
    pet.name = name
    pet.age = age
    pet.breed = breed
    pet.gender = gender
    pet.health = health
    pet.owner = owner
    pet.species = species
    pet.urlImg = urlImg ? process.env.POST_IMG +"/files/"+urlImg : ''
    return await this.petRepository.save(pet)
  }

  @Mutation('deletePet')
  async deletePet(@Args('_id') _id: string): Promise<Boolean> {
    try {
			const message = 'Not Found: Pet'
			const code = '404'
			const additionalProperties = {}

			const pet = await this.petRepository.findOne({_id, isActive: true})

			if (!pet) {
				throw new ApolloError(message, code, additionalProperties)
			}
      pet.isActive = false
      return (await this.petRepository.save(pet)) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }
  @Mutation('updatePet')
  async updatePet(@Args('_id') _id: string, @Args('input') input: UpdatePetInput): Promise<Boolean> {
    try {
			const message = 'Not Found: Pet'
			const code = '404'
			const additionalProperties = {}

			const pet = await this.petRepository.findOne({_id})

			if (!pet) {
				throw new ApolloError(message, code, additionalProperties)
			}
      const {age, health, urlImg} = input
      pet.age = age
      pet.health = health
      pet.urlImg = urlImg ? process.env.POST_IMG +"/files/"+urlImg : pet.urlImg
      return await this.petRepository.save(pet) ? true : false
		} catch (error) {
			throw new ApolloError(error, '500', {})
		}
  }

}

