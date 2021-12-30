<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td>
            <button
              v-if="user.isAdmin"
              @click.prevent.stop="toggleUserRole(user.id)"
              type="button"
              class="btn btn-link"
            >
              set as user
            </button>
            <button
              v-else
              @click.prevent.stop="toggleUserRole(user.id)"
              type="button"
              class="btn btn-link"
            >
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
      isAdmin: true,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$aKzWxsKppDwcpOuFgLwJquMpx62ju.jo3hQguSRdTx/0dYD9nH0iW",
      isAdmin: false,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$T6xw1J4f5CSva9DVTszSb.0kWEP7XSzVj.Xhp1xpQ7SmDiDPOtx3i",
      isAdmin: false,
      image: null,
      createdAt: "2021-11-12T08:51:33.000Z",
      updatedAt: "2021-11-12T08:51:33.000Z",
    },
  ],
};
const dummyCurrentUser = {
  profile: {
    id: 1,
    name: "root",
    email: "root@example.com",
    password: "$2a$10$vr7Byde8WjcCaI0VlTNjCuLCerpE8wiGo8ri2.ZSfAFrDg8k4wLbO",
    isAdmin: true,
    image: null,
    createdAt: "2021-11-12T08:51:33.000Z",
    updatedAt: "2021-11-12T08:51:33.000Z",
    Comments: [
      {
        id: 1,
        text: "Autem debitis dolorem.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 1,
          name: "Kaelyn Wunsch",
          tel: "(582) 572-0301 x14208",
          address: "2436 Trisha Track",
          opening_hours: "08:00",
          description:
            "Qui dolore et ut asperiores expedita iure velit qui est.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
          viewCounts: 1,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-15T09:33:50.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 2,
        text: "Nemo ea et.",
        UserId: 1,
        RestaurantId: 2,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 2,
          name: "Felicia Goodwin",
          tel: "1-670-918-1224 x177",
          address: "5210 Clementine Spurs",
          opening_hours: "08:00",
          description:
            "At ut quia sit debitis ut repudiandae deserunt delectus. Delectus rerum qui. Fugit dolorem quia ex. Et eum sunt minima libero ea.\n \rDoloremque debitis nemo temporibus facilis. Esse voluptatem praesentium nulla dolorum quam molestias ducimus. Vitae sapiente quae in ea laboriosam sit aut corporis. Accusantium dolor et et doloribus voluptatem cupiditate ut repellat.\n \rEnim quisquam ea quod quo aliquid molestiae. Cumque dolorum expedita. Error dolorum rerum maxime doloremque non molestiae enim doloremque.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=58.31352904784659",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 6,
        text: "Ipsa odit optio distinctio debitis quae consequuntur eos.",
        UserId: 1,
        RestaurantId: 6,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 6,
          name: "Anika Runolfsdottir",
          tel: "878-308-4165 x247",
          address: "8429 Bogan Square",
          opening_hours: "08:00",
          description:
            "Dolor itaque a. Dolores quia quo ipsa et ut adipisci reiciendis. Recusandae nam quia adipisci aut id facere in exercitationem libero.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=55.438464262435396",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 7,
        text: "Nulla voluptatem facilis corporis.",
        UserId: 1,
        RestaurantId: 7,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 7,
          name: "Reva Buckridge DVM",
          tel: "(998) 695-8808",
          address: "50233 Hodkiewicz Roads",
          opening_hours: "08:00",
          description:
            "Labore harum omnis nostrum et eos.\nDicta rerum quasi impedit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=37.33150842792734",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 9,
        text: "Eaque laudantium veritatis quisquam quia autem nobis ab.",
        UserId: 1,
        RestaurantId: 9,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 9,
          name: "Hollis Hoeger",
          tel: "419-197-9506 x1265",
          address: "29148 Vernie Unions",
          opening_hours: "08:00",
          description: "sit aut debitis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=15.121348929196499",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 15,
        text: "Dolores error consequatur.",
        UserId: 1,
        RestaurantId: 15,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 15,
          name: "Mr. Winifred Krajcik",
          tel: "1-061-530-3438",
          address: "66164 Keebler Plaza",
          opening_hours: "08:00",
          description:
            "Sapiente et accusantium. Dolores impedit qui molestias. Nisi sequi excepturi quis molestias. Ut velit rerum suscipit rerum commodi deserunt earum.\n \rLabore ipsum tenetur odit accusamus temporibus ullam dicta est eos. Nemo minus omnis qui delectus veniam et non. Deleniti illum enim voluptatum dolor eveniet vitae dolores natus perspiciatis. Voluptatem eius aspernatur quia enim illo atque similique eaque.\n \rQuae eveniet animi nihil sed quia sunt atque ut placeat. Mollitia ullam necessitatibus perferendis fuga illo voluptatem. Ipsam incidunt eos dolor similique praesentium sit sed et. Eos veniam ut animi repudiandae hic repellat id. Molestiae rerum et illo.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=36.60256350389013",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 18,
        text: "Ut sunt nulla animi deleniti dolorem officia porro porro.",
        UserId: 1,
        RestaurantId: 18,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 18,
          name: "Ivory Cremin",
          tel: "(441) 955-9418 x74362",
          address: "02479 Autumn Crescent",
          opening_hours: "08:00",
          description: "sit nulla quo",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=22.384875801848647",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 19,
        text: "Qui reiciendis facere ut quas ut autem sint recusandae.",
        UserId: 1,
        RestaurantId: 19,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 19,
          name: "Dr. Tad Fadel",
          tel: "(993) 169-6928",
          address: "430 O'Kon Creek",
          opening_hours: "08:00",
          description:
            "Porro quod magni. Dolor in voluptatum eaque culpa architecto adipisci quis quia. Distinctio aspernatur ipsum eos voluptatem ut atque quisquam rerum. Eius quam ut assumenda repellendus tenetur ab quaerat sint. Nihil labore et ut. Neque voluptatum sapiente mollitia voluptatem debitis in natus et aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.307710380843652",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 20,
        text: "Quaerat sit dolore aliquid quas impedit quaerat.",
        UserId: 1,
        RestaurantId: 20,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 20,
          name: "Elian Powlowski",
          tel: "029-307-6680 x648",
          address: "32565 Jodie Inlet",
          opening_hours: "08:00",
          description: "excepturi vitae temporibus",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=9.233627206808181",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 22,
        text: "Sit et molestiae sed incidunt nihil enim possimus et.",
        UserId: 1,
        RestaurantId: 22,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 22,
          name: "Isai Jerde",
          tel: "473-321-0128 x395",
          address: "819 Kemmer Squares",
          opening_hours: "08:00",
          description:
            "Architecto non quia minima quia expedita similique quis accusamus explicabo.\nOccaecati id animi impedit repellendus quam.\nQuia architecto odio.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=97.18608223355747",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 28,
        text: "Eum et velit aut dignissimos molestiae assumenda.",
        UserId: 1,
        RestaurantId: 28,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 28,
          name: "Cleve Nader",
          tel: "1-971-910-9670 x1560",
          address: "73757 Wisozk Fall",
          opening_hours: "08:00",
          description:
            "Voluptatem ut aut. Odio aut quae maxime ea consequatur qui. Veritatis dolorem eius fugiat possimus est illo sed excepturi excepturi. Ratione ut iusto facilis provident dolor. Dolor officia dolorem sed quas. Quidem id alias pariatur odio.\n \rFuga provident rem eos molestiae distinctio illum quibusdam. Cupiditate minus nihil molestias voluptatibus distinctio. Ex facilis totam. Sed molestias ullam esse.\n \rOdit ut et excepturi quaerat illo voluptatem error. Et et ratione voluptatem tempora. Quam aliquam libero provident quia occaecati nihil corrupti totam culpa. Non voluptas architecto est aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=61.2949763953331",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 30,
        text: "Et similique atque quis et vel nesciunt suscipit dolor.",
        UserId: 1,
        RestaurantId: 30,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 30,
          name: "Dr. Terry Greenholt",
          tel: "903.313.3255 x882",
          address: "18965 Rutherford Springs",
          opening_hours: "08:00",
          description:
            "Occaecati odio minima quo perspiciatis nihil voluptas optio vel.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.760349971987353",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 35,
        text: "Voluptatem ex unde eveniet.",
        UserId: 1,
        RestaurantId: 35,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 35,
          name: "Isac Cummings",
          tel: "261.785.4340",
          address: "940 Tremayne Tunnel",
          opening_hours: "08:00",
          description:
            "Ut cupiditate aut distinctio dicta aut.\nNobis ea enim.\nNobis id quia minus.\nRepellendus consectetur non temporibus voluptatem id cupiditate et et.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=70.11347039425367",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 37,
        text: "Corrupti laboriosam aliquam adipisci id.",
        UserId: 1,
        RestaurantId: 37,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 37,
          name: "Randal Halvorson",
          tel: "093.274.4642",
          address: "74163 Kaleb Mountain",
          opening_hours: "08:00",
          description:
            "Quae molestiae nihil ipsa enim fugit autem est. Magni quasi deserunt aut. Assumenda magnam atque nihil.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=77.90048132511906",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 38,
        text: "Et repellat tempore nisi similique fugit soluta et labore.",
        UserId: 1,
        RestaurantId: 38,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 38,
          name: "Shanelle Smith Jr.",
          tel: "(694) 959-8389 x612",
          address: "748 Ferry Ways",
          opening_hours: "08:00",
          description: "ut",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=39.77955833581846",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 40,
        text: "Quas assumenda architecto vitae quisquam vero iure sit voluptas.",
        UserId: 1,
        RestaurantId: 40,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 40,
          name: "Lempi Muller",
          tel: "845.098.3340",
          address: "52135 Champlin Pine",
          opening_hours: "08:00",
          description:
            "Exercitationem doloremque consectetur aut et sit officiis porro. Quasi ut vel praesentium quisquam nisi alias voluptas. Qui et magni dolorem est. Eum velit tempore temporibus. Excepturi facilis eum ea et laborum cumque. Quam molestiae quas ut corrupti sapiente.\n \rAt provident neque doloribus illum provident aliquid vel cumque cum. Qui odit iusto dolorem mollitia omnis atque voluptatem sunt. Rerum minima possimus debitis expedita quis ratione ut ullam aut. Soluta quisquam voluptas voluptatibus laborum quasi nostrum recusandae animi. Iusto accusamus ut.\n \rLaborum vero voluptatibus sunt fugit beatae. Quia quaerat ea magni pariatur a. Iusto cum quis nulla asperiores. Et eaque ratione ducimus ullam tempora. Eum qui neque.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=69.28397086895437",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 41,
        text: "Illo ut quia repudiandae consequatur.",
        UserId: 1,
        RestaurantId: 41,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 41,
          name: "Sofia Larson",
          tel: "(491) 571-0080 x5354",
          address: "6246 Torp Drive",
          opening_hours: "08:00",
          description: "Commodi eveniet laboriosam.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=47.57333572074587",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 46,
        text: "Voluptatum unde architecto debitis quia beatae.",
        UserId: 1,
        RestaurantId: 46,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 46,
          name: "Leonie Kohler",
          tel: "265-023-4491 x5165",
          address: "95309 Nayeli Corner",
          opening_hours: "08:00",
          description: "ipsa in natus",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=66.37597903074635",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 47,
        text: "Qui hic possimus sit reiciendis molestiae qui modi.",
        UserId: 1,
        RestaurantId: 47,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 47,
          name: "Roslyn Hammes",
          tel: "150.532.7325",
          address: "144 Delia Shoals",
          opening_hours: "08:00",
          description:
            "Eum beatae quidem voluptates voluptatibus. Est beatae tempore illo. Aut eius libero. Porro neque voluptates ratione ullam sunt.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=31.951782365833225",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 48,
        text: "Sequi aperiam corporis occaecati.",
        UserId: 1,
        RestaurantId: 48,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 48,
          name: "Kian Hahn",
          tel: "870.648.7494 x85702",
          address: "092 Durgan Stravenue",
          opening_hours: "08:00",
          description:
            "Et culpa et minima aut fugiat. Exercitationem eum provident voluptatem enim dolorem quia officiis et explicabo.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=15.614602510303843",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 51,
        text: "Omnis qui consectetur.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 1,
          name: "Kaelyn Wunsch",
          tel: "(582) 572-0301 x14208",
          address: "2436 Trisha Track",
          opening_hours: "08:00",
          description:
            "Qui dolore et ut asperiores expedita iure velit qui est.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
          viewCounts: 1,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-15T09:33:50.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 55,
        text: "Quo optio non et enim aut tenetur ut ullam.",
        UserId: 1,
        RestaurantId: 5,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 5,
          name: "Ms. Talia Rowe",
          tel: "1-217-663-1951 x26192",
          address: "758 Klocko Villages",
          opening_hours: "08:00",
          description:
            "Sint odit dolores quia. Voluptates dolor minus dolorum in sed. Magni vero cupiditate magni.\n \rPariatur qui animi similique distinctio quisquam iusto. Est illo ratione error. Rerum atque non adipisci autem labore quaerat sapiente. Temporibus est voluptates distinctio eveniet nulla necessitatibus consequatur ullam.\n \rTempora eos enim voluptatem qui dolorem tempora ut. Cum culpa incidunt sed cum maiores illo qui minima. Quo ipsam reprehenderit.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=70.60134330800263",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 59,
        text: "Dolor consequuntur eos deserunt exercitationem ipsum hic magni magnam.",
        UserId: 1,
        RestaurantId: 9,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 9,
          name: "Hollis Hoeger",
          tel: "419-197-9506 x1265",
          address: "29148 Vernie Unions",
          opening_hours: "08:00",
          description: "sit aut debitis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=15.121348929196499",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 62,
        text: "Aliquam occaecati temporibus dolor odit architecto corrupti ipsam est.",
        UserId: 1,
        RestaurantId: 12,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 12,
          name: "Napoleon Zieme",
          tel: "510-042-1758 x5366",
          address: "1596 Erling Trace",
          opening_hours: "08:00",
          description:
            "Eos consectetur optio similique iste ut odit. Tempora voluptatem voluptatem eos. Provident sunt magnam ut optio aut eaque facilis.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=88.21276159756894",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 67,
        text: "Voluptatibus voluptatem beatae culpa laudantium optio asperiores.",
        UserId: 1,
        RestaurantId: 17,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 17,
          name: "Shad Glover",
          tel: "1-445-843-5037",
          address: "5886 Emard Crescent",
          opening_hours: "08:00",
          description:
            "Voluptatem commodi iste.\nConsequuntur esse voluptatem amet dolorem cupiditate cupiditate.\nMagnam quidem illum ut ullam et.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=56.461900561627985",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 68,
        text: "Necessitatibus quo et aliquid omnis qui iusto sed ea iusto.",
        UserId: 1,
        RestaurantId: 18,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 18,
          name: "Ivory Cremin",
          tel: "(441) 955-9418 x74362",
          address: "02479 Autumn Crescent",
          opening_hours: "08:00",
          description: "sit nulla quo",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=22.384875801848647",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 69,
        text: "Maiores eum eligendi et veniam.",
        UserId: 1,
        RestaurantId: 19,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 19,
          name: "Dr. Tad Fadel",
          tel: "(993) 169-6928",
          address: "430 O'Kon Creek",
          opening_hours: "08:00",
          description:
            "Porro quod magni. Dolor in voluptatum eaque culpa architecto adipisci quis quia. Distinctio aspernatur ipsum eos voluptatem ut atque quisquam rerum. Eius quam ut assumenda repellendus tenetur ab quaerat sint. Nihil labore et ut. Neque voluptatum sapiente mollitia voluptatem debitis in natus et aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.307710380843652",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 70,
        text: "Praesentium saepe quis.",
        UserId: 1,
        RestaurantId: 20,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 20,
          name: "Elian Powlowski",
          tel: "029-307-6680 x648",
          address: "32565 Jodie Inlet",
          opening_hours: "08:00",
          description: "excepturi vitae temporibus",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=9.233627206808181",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 78,
        text: "Vero laborum ipsa rerum modi.",
        UserId: 1,
        RestaurantId: 28,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 28,
          name: "Cleve Nader",
          tel: "1-971-910-9670 x1560",
          address: "73757 Wisozk Fall",
          opening_hours: "08:00",
          description:
            "Voluptatem ut aut. Odio aut quae maxime ea consequatur qui. Veritatis dolorem eius fugiat possimus est illo sed excepturi excepturi. Ratione ut iusto facilis provident dolor. Dolor officia dolorem sed quas. Quidem id alias pariatur odio.\n \rFuga provident rem eos molestiae distinctio illum quibusdam. Cupiditate minus nihil molestias voluptatibus distinctio. Ex facilis totam. Sed molestias ullam esse.\n \rOdit ut et excepturi quaerat illo voluptatem error. Et et ratione voluptatem tempora. Quam aliquam libero provident quia occaecati nihil corrupti totam culpa. Non voluptas architecto est aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=61.2949763953331",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 82,
        text: "Rerum sunt officia.",
        UserId: 1,
        RestaurantId: 32,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 32,
          name: "Herbert Jaskolski",
          tel: "998.983.3049",
          address: "57451 Grady Crest",
          opening_hours: "08:00",
          description: "Corrupti excepturi eius maiores alias quae qui.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=0.6649392860715864",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 88,
        text: "Nisi tenetur cupiditate quam minus.",
        UserId: 1,
        RestaurantId: 38,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 38,
          name: "Shanelle Smith Jr.",
          tel: "(694) 959-8389 x612",
          address: "748 Ferry Ways",
          opening_hours: "08:00",
          description: "ut",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=39.77955833581846",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 89,
        text: "Numquam tempora pariatur et ipsa aut eos.",
        UserId: 1,
        RestaurantId: 39,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 39,
          name: "Marquis Hills",
          tel: "(447) 554-1320 x094",
          address: "76168 Eleanora Orchard",
          opening_hours: "08:00",
          description:
            "Et et ea sunt laboriosam mollitia quia. Quaerat repellendus molestias nihil dolore et laboriosam sit. Consequatur impedit doloremque dolorum voluptatum omnis voluptatibus inventore ut.\n \rDolor praesentium corrupti. Minus et id voluptas. Debitis aspernatur dolores maiores eum quas minima quisquam itaque. Aut nam quis aut et.\n \rBlanditiis eos aperiam sit optio. Quisquam consequatur nesciunt quaerat rerum dolorum ut assumenda. Ut autem temporibus. Reiciendis odit ratione cum ducimus. Saepe dolore commodi voluptatem et repellat quis.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=1.9087089706556704",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 90,
        text: "Rem saepe debitis esse minus libero magni rerum.",
        UserId: 1,
        RestaurantId: 40,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 40,
          name: "Lempi Muller",
          tel: "845.098.3340",
          address: "52135 Champlin Pine",
          opening_hours: "08:00",
          description:
            "Exercitationem doloremque consectetur aut et sit officiis porro. Quasi ut vel praesentium quisquam nisi alias voluptas. Qui et magni dolorem est. Eum velit tempore temporibus. Excepturi facilis eum ea et laborum cumque. Quam molestiae quas ut corrupti sapiente.\n \rAt provident neque doloribus illum provident aliquid vel cumque cum. Qui odit iusto dolorem mollitia omnis atque voluptatem sunt. Rerum minima possimus debitis expedita quis ratione ut ullam aut. Soluta quisquam voluptas voluptatibus laborum quasi nostrum recusandae animi. Iusto accusamus ut.\n \rLaborum vero voluptatibus sunt fugit beatae. Quia quaerat ea magni pariatur a. Iusto cum quis nulla asperiores. Et eaque ratione ducimus ullam tempora. Eum qui neque.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=69.28397086895437",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 100,
        text: "Quia natus rerum voluptatem cumque nihil molestiae quo.",
        UserId: 1,
        RestaurantId: 50,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 50,
          name: "Abdiel Lesch",
          tel: "415.470.5261 x4797",
          address: "9217 Itzel Avenue",
          opening_hours: "08:00",
          description: "Molestias est voluptatum nihil quia dolorem.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=34.37060217826933",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 101,
        text: "Praesentium tempora aut sunt perferendis.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 1,
          name: "Kaelyn Wunsch",
          tel: "(582) 572-0301 x14208",
          address: "2436 Trisha Track",
          opening_hours: "08:00",
          description:
            "Qui dolore et ut asperiores expedita iure velit qui est.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=63.192605923387866",
          viewCounts: 1,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-15T09:33:50.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 108,
        text: "Recusandae tempora pariatur at commodi quasi et.",
        UserId: 1,
        RestaurantId: 8,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 8,
          name: "Winona Mosciski",
          tel: "439.147.9690",
          address: "7453 Leopoldo Vista",
          opening_hours: "08:00",
          description:
            "Tenetur expedita veritatis. Impedit et et et quisquam qui et vitae. Ut laborum ut. Aspernatur assumenda illum et voluptatem veniam. Voluptatem reiciendis hic et ratione illo dolor.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=9.508990747156876",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 109,
        text: "Et sunt iste atque numquam eveniet libero accusamus.",
        UserId: 1,
        RestaurantId: 9,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 9,
          name: "Hollis Hoeger",
          tel: "419-197-9506 x1265",
          address: "29148 Vernie Unions",
          opening_hours: "08:00",
          description: "sit aut debitis",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=15.121348929196499",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 111,
        text: "In perferendis autem autem ratione fugit quasi porro accusamus qui.",
        UserId: 1,
        RestaurantId: 11,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 11,
          name: "Charity Wintheiser IV",
          tel: "752.395.8517 x4110",
          address: "50562 Dietrich Island",
          opening_hours: "08:00",
          description: "nihil",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=17.343809048698546",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 113,
        text: "Voluptatem nulla ab molestias eligendi.",
        UserId: 1,
        RestaurantId: 13,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 13,
          name: "Jeanne Boehm",
          tel: "(960) 326-7945",
          address: "81065 Alek Route",
          opening_hours: "08:00",
          description: "Similique officia id.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=21.437613300675686",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 119,
        text: "Recusandae velit tempore molestiae ullam.",
        UserId: 1,
        RestaurantId: 19,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 19,
          name: "Dr. Tad Fadel",
          tel: "(993) 169-6928",
          address: "430 O'Kon Creek",
          opening_hours: "08:00",
          description:
            "Porro quod magni. Dolor in voluptatum eaque culpa architecto adipisci quis quia. Distinctio aspernatur ipsum eos voluptatem ut atque quisquam rerum. Eius quam ut assumenda repellendus tenetur ab quaerat sint. Nihil labore et ut. Neque voluptatum sapiente mollitia voluptatem debitis in natus et aut.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.307710380843652",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 123,
        text: "Reiciendis qui expedita aut.",
        UserId: 1,
        RestaurantId: 23,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 23,
          name: "Gardner Lowe",
          tel: "(323) 951-2724 x655",
          address: "35499 Torp Lock",
          opening_hours: "08:00",
          description: "optio",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=81.4598231913298",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 124,
        text: "Nemo labore dolorum quaerat dignissimos quo qui sint.",
        UserId: 1,
        RestaurantId: 24,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 24,
          name: "Mrs. Alanis McKenzie",
          tel: "818-883-7346 x3608",
          address: "25906 Lionel Mission",
          opening_hours: "08:00",
          description: "dolorum",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=71.98084623458976",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 129,
        text: "Fuga neque at voluptate officia minus et ut iure.",
        UserId: 1,
        RestaurantId: 29,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 29,
          name: "Eldred Schultz",
          tel: "1-388-187-2787",
          address: "235 Chaim Mountains",
          opening_hours: "08:00",
          description: "accusantium consectetur et",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=9.682053204383202",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 130,
        text: "Non numquam esse.",
        UserId: 1,
        RestaurantId: 30,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 30,
          name: "Dr. Terry Greenholt",
          tel: "903.313.3255 x882",
          address: "18965 Rutherford Springs",
          opening_hours: "08:00",
          description:
            "Occaecati odio minima quo perspiciatis nihil voluptas optio vel.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=27.760349971987353",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 5,
        },
      },
      {
        id: 132,
        text: "Explicabo sequi vel at harum.",
        UserId: 1,
        RestaurantId: 32,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 32,
          name: "Herbert Jaskolski",
          tel: "998.983.3049",
          address: "57451 Grady Crest",
          opening_hours: "08:00",
          description: "Corrupti excepturi eius maiores alias quae qui.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=0.6649392860715864",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
      {
        id: 134,
        text: "Quas dicta pariatur voluptate eum qui molestiae libero odio laborum.",
        UserId: 1,
        RestaurantId: 34,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 34,
          name: "Arch Wilkinson",
          tel: "1-770-088-6622 x7580",
          address: "561 Goodwin Forge",
          opening_hours: "08:00",
          description: "dolores assumenda voluptas",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=58.70774328233177",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 136,
        text: "Totam veritatis quam perferendis veniam.",
        UserId: 1,
        RestaurantId: 36,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 36,
          name: "Rossie Runolfsdottir",
          tel: "1-618-991-4485 x2148",
          address: "306 Lucius Lane",
          opening_hours: "08:00",
          description: "sed",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=82.55571469384402",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 1,
        },
      },
      {
        id: 144,
        text: "Fugit id reprehenderit animi ut neque non fugiat.",
        UserId: 1,
        RestaurantId: 44,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 44,
          name: "Gladys Bailey MD",
          tel: "1-832-096-4793 x0189",
          address: "909 Elroy Mission",
          opening_hours: "08:00",
          description: "magni",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=21.52210407845785",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 146,
        text: "Quia dolore voluptas recusandae voluptas et aut rerum.",
        UserId: 1,
        RestaurantId: 46,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 46,
          name: "Leonie Kohler",
          tel: "265-023-4491 x5165",
          address: "95309 Nayeli Corner",
          opening_hours: "08:00",
          description: "ipsa in natus",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=66.37597903074635",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 2,
        },
      },
      {
        id: 147,
        text: "Rem odit aut sunt impedit ex vel quam itaque voluptates.",
        UserId: 1,
        RestaurantId: 47,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 47,
          name: "Roslyn Hammes",
          tel: "150.532.7325",
          address: "144 Delia Shoals",
          opening_hours: "08:00",
          description:
            "Eum beatae quidem voluptates voluptatibus. Est beatae tempore illo. Aut eius libero. Porro neque voluptates ratione ullam sunt.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=31.951782365833225",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 4,
        },
      },
      {
        id: 149,
        text: "Et dolorem consequatur repellendus magni accusamus sit eveniet fuga.",
        UserId: 1,
        RestaurantId: 49,
        createdAt: "2021-11-12T08:51:33.000Z",
        updatedAt: "2021-11-12T08:51:33.000Z",
        Restaurant: {
          id: 49,
          name: "Mr. Jamir Huel",
          tel: "423-505-5814",
          address: "8068 Klocko Loop",
          opening_hours: "08:00",
          description: "Sequi quia voluptas et tempora.\nNulla et enim.",
          image:
            "https://loremflickr.com/320/240/restaurant,food/?random=16.22286749725039",
          viewCounts: 0,
          createdAt: "2021-11-12T08:51:33.000Z",
          updatedAt: "2021-11-12T08:51:33.000Z",
          CategoryId: 3,
        },
      },
    ],
    FavoritedRestaurants: [],
    Followers: [],
    Followings: [],
  },
  isFollowed: false,
};

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      currentUser: {},
    };
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
      this.currentUser = dummyCurrentUser;
    },
    toggleUserRole(userId) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        }
        return user;
      });
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>